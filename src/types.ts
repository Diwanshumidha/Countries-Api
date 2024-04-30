export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  fifa: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  continents: string[];
  languages: {
    [key: string]: string;
  };
  translations: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
  latlng: number[];
  landlocked: boolean;
  borders: string[];
  area: number;
  flag: string;
  demonyms: {
    [key: string]: {
      f: string;
      m: string;
    };
  };
  flags: string[];
  population: number;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  gini: Record<string, never>;
  car: {
    signs: never[];
    side: string;
  };
  timezones: string[];
}
