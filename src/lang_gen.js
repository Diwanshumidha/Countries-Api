const fs = require("fs");
const countries = require("../resources/countries.json");

let allCurrencies = [];
let allLanguages = [];

countries.forEach((country) => {
  Object.entries(country.currencies).forEach(([code, currency], idx) => {
    allCurrencies.push({
      code,
      ...currency,
    });
  });

  Object.entries(country.languages).forEach(([code, language]) => {
    console.log(code, language);
    allLanguages.push({
      code,
      language,
    });
  });
});

// const stringifiedCurrency = allCurrencies;
// console.log(stringifiedCurrency);

fs.writeFileSync("all_currencies.json", JSON.stringify(allCurrencies, null, 2));
fs.writeFileSync("all_languages.json", JSON.stringify(allLanguages, null, 2));

console.log(
  "All currencies and languages extracted and saved to separate JSON files."
);
