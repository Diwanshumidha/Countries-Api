import { Hono } from "hono/quick";
import { logger } from "hono/logger";
import countries from "../resources/countries.json";
import languages from "../resources/all_languages.json";
import currencies from "../resources/all_currencies.json";

import Fuse from "fuse.js";
import { prettyJSON } from "hono/pretty-json";
import { timing, startTime, endTime } from "hono/timing";
import { Country } from "./types";
import { cache } from "hono/cache";

const fuseOptions = {
  includeScore: true,
  minMatchCharLength: 3,
  threshold: 0.4,
  keys: [
    { name: "name.common", weight: 2 },
    { name: "name.official", weight: 2 },
    "cca2",
    "cca3",
    "altSpellings",
  ],
};

const fuse = new Fuse(countries, fuseOptions);

function filterFields(countries: any[], fields: string): Country[] {
  return countries.map((country) => {
    const filteredCountry: any = Object.fromEntries(
      Object.entries(country).filter(([key]) => fields.split(",").includes(key))
    );
    return filteredCountry as any;
  });
}

const app = new Hono();
app.use(timing());
app.use(logger());
app.use(prettyJSON());

app.get(
  "*",
  cache({
    cacheName: "countries",
    cacheControl: "max-age=1000",
  })
);

app.get("/", (c) => {
  const fields = c.req.query("fields");
  const page = parseInt(c.req.query("page") || "1", 10);
  const limit = parseInt(c.req.query("limit") || "10", 10);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedCountries = countries.slice(startIndex, endIndex);

  let filteredResults: any = paginatedCountries;
  if (fields) {
    filteredResults = filterFields(paginatedCountries, fields);
  }

  return c.json({
    data: filteredResults,
    page,
    limit,
    total: countries.length,
  });
});

app.get("/fuzzy", (c) => {
  const q = c.req.query("q");
  const fields = c.req.query("fields");
  console.log({ q });
  if (!q) {
    return c.text("Please Put A Query");
  }

  startTime(c, "db");
  const result = fuse
    .search(q)
    .slice(0, 10)
    .map((res) => res.item);
  endTime(c, "db");

  let filteredResults: any = result;
  if (fields) {
    filteredResults = filterFields(result, fields);
  }
  return c.json(filteredResults);
});

app.get("/code/:code", (c) => {
  const code = c.req.param("code");
  const country = countries.find(
    (c) =>
      c.cca2.toLowerCase() === code.toLowerCase() ||
      c.cca3.toLowerCase() === code.toLowerCase() ||
      c.cioc.toLowerCase() === code.toLowerCase()
  );
  return country ? c.json(country) : c.text("Country not found", 404);
});

app.get("/search", (c) => {
  const { currency, language, name, fields } = c.req.query();

  let results = countries;

  if (name) {
    const searchTerm = name.toLowerCase();
    results = results.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm)
    );
  }

  if (currency) {
    const searchTerm = currency.toLowerCase();
    results = results.filter((country) =>
      Object.keys(country.currencies).some((currencyKey) => {
        return currencyKey.toLowerCase().includes(searchTerm);
      })
    );
  }

  if (language) {
    const searchTerm = language.toLowerCase();
    results = results.filter((country) =>
      Object.keys(country.languages).some(
        (languageName) => languageName.toLowerCase() === searchTerm
      )
    );
  }

  let filteredResults: any = results;
  if (fields) {
    filteredResults = filterFields(results, fields);
  }
  return c.json(filteredResults);
});

app.get("/languages", (c) => {
  return c.json(languages);
});
app.get("/currencies", (c) => {
  return c.json(currencies);
});

app.notFound((c) => {
  return c.text("404 The Route Is Not Available", 404);
});

export default app;
