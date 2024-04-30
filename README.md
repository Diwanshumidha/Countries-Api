# Countries API

The Countries API provides information about countries, including their names, languages, currencies, and more. It offers various endpoints for querying and retrieving data about countries.

## Base URL

The API is hosted at `https://countries.mdiwanshu.workers.dev`.

## Example Response

```json
      [
    {
  	"name": {
  		"common": "Aruba",
  		"official": "Aruba",
  		"nativeName": {
  			"nld": {
  				"official": "Aruba",
  				"common": "Aruba"
  			},
  			"pap": {
  				"official": "Aruba",
  				"common": "Aruba"
  			}
  		}
  	},
  	"tld": [
  		".aw"
  	],
  	"cca2": "AW",
  	"ccn3": "533",
  	"cca3": "ABW",
  	"cioc": "ARU",
  	"fifa": "ARU",
  	"independent": false,
  	"status": "officially-assigned",
  	"unMember": false,
  	"currencies": {
  		"AWG": {
  			"name": "Aruban florin",
  			"symbol": "\u0192"
  		}
  	},
  	"idd": {
  		"root": "+2",
  		"suffixes": [
  			"97"
  		]
  	},
  	"capital": [
  		"Oranjestad"
  	],
  	"altSpellings": [
  		"AW"
  	],
  	"region": "Americas",
  	"subregion": "Caribbean",
  	"continents": [
  		"North America"
  	],
  	"languages": {
  		"nld": "Dutch",
  		"pap": "Papiamento"
  	},
  	"translations": {
  		"ara": {
  			"official": "\u0623\u0631\u0648\u0628\u0627",
  			"common": "\u0623\u0631\u0648\u0628\u0627"
  		},
  		"bre": {
  			"official": "Aruba",
  			"common": "Aruba"
  		},
  	},
  	"latlng": [
  		12.5,
  		-69.96666666
  	],
  	"landlocked": false,
  	"borders": [],
  	"area": 180,
  	"flag": "\ud83c\udde6\ud83c\uddfc",
  	"demonyms": {
  		"eng": {
  			"f": "Aruban",
  			"m": "Aruban"
  		},
  		"fra": {
  			"f": "Arubaise",
  			"m": "Arubais"
  		}
  	},
  	"flags": [
  		"https://flagcdn.com/aw.svg",
  		"https://flagcdn.com/w320/aw.png"
  	],
  	"population": 106766,
  	"maps": {
  		"googleMaps": "https://goo.gl/maps/8hopbQqifHAgyZyg8",
  		"openStreetMaps": "https://www.openstreetmap.org/relation/1231749"
  	},
  	"gini": {},
  	"car": {
  		"signs": [],
  		"side": "right"
  	},
  	"timezones": [
  		"UTC-04:00"
  	]
  },
    ...
  ]
```

## Endpoints

### Get a list of countries

- **Endpoint**: `/`
- **Query Parameters**:
  - `fields` (optional): Specify the fields to include in the response (comma-separated).
  - `page` (optional): Specify the page number for pagination.
  - `limit` (optional): Specify the number of items per page for pagination.
- **Example Request**: `GET https://countries.mdiwanshu.workers.dev/?fields=name,currencies`

- **Example Response**:
  ```json
    [
        {
            "name": {
            "common": "United States",
            "official": "United States of America"
            },
            "currencies": {
            "USD": {
                "name": "United States dollar",
                "symbol": "$"
            }
            }
        },
    ...
    ]
  ```

### Perform a fuzzy search

- **Endpoint**: `/fuzzy`
- **Query Parameters**:
  - `q` (required): Specify the query string for fuzzy search.
  - `fields` (optional): Specify the fields to include in the response (comma-separated).
- **Example Request**: `GET https://countries.mdiwanshu.workers.dev/fuzzy?q=ra&fields=name`
- **Fuzzy Search**: Fuzzy Search will search the query through the database from and finds the closest match. irrelevant of the case and will also work if there is typo. For example, if you search for `ra`, it will return `Rwanda` and other similar names. <br>
  and it will only search through these fields:

        1. name.common
        2. name.official
        3. cca2
        4. cca3
        5. altSpellings

- **Example Response**:
  ```json
  [
    {
      "name": {
        "common": "Bahrain",
        "official": "Kingdom of Bahrain"
      }
    },
    ...
  ]
  ```

### Get information about a country by code

- **Endpoint**: `/code/:code`
- **Query Parameters**: None
- **Example Request**: `GET https://countries.mdiwanshu.workers.dev/code/US`
- **Example Response**:
  ```json
  {
    "name": {
      "common": "United States",
      "official": "United States of America"
    },
    "currencies": {
      "USD": {
        "name": "United States dollar",
        "symbol": "$"
      }
    },
    ...
  }
  ```

### Search for countries

- **Endpoint**: `/search`
- **Query Parameters**:
  - `name` (optional): Specify the country name to search for.
  - `currency` (optional): Specify the currency code to search for. You can get list af all currency code [here](https://countries.mdiwanshu.workers.dev/currencies).
  - `language` (optional): Specify the language code to search for. You can get list af all language code [here](https://countries.mdiwanshu.workers.dev/languages).
  - `fields` (optional): Specify the fields to include in the response (comma-separated).
- **Example Request**: `GET https://countries.mdiwanshu.workers.dev/search?name=united&currency=usd&fields=name,currencies`
- **Example Response**:
  ```json
  [
    {
      "name": {
        "common": "United States",
        "official": "United States of America"
      },
      "currencies": {
        "USD": {
          "name": "United States dollar",
          "symbol": "$"
        }
      }
    }
  ]
  ```

### Get a list of all languages

- **Endpoint**: `/languages`
- **Query Parameters**: None
- **Example Request**: `GET https://countries.mdiwanshu.workers.dev/languages`
- **Example Response**:
  ```json
  {
    "ab": "Abkhaz",
    "aa": "Afar",
    ...
  }
  ```

### Get a list of all currencies

- **Endpoint**: `/currencies`
- **Query Parameters**: None
- **Example Request**: `GET https://countries.mdiwanshu.workers.dev/currencies`
- **Example Response**:
  ```json
  {
    "AFN": {
      "name": "Afghan afghani",
      "symbol": "؋"
    },
    ...
  }
  ```

## Filtering Currencies and Languages

When searching for countries by currency or language, you can use the `/currencies` and `/languages` endpoints to get a list of all currencies and languages, respectively. This can help you filter your search queries more effectively.

## Fields

You can use the `fields` query parameter to specify which fields you want to include in the response. The following fields are available for selection:

- `name`: The name of the country.
- `currencies`: Information about the currencies used in the country.
- `languages`: Information about the languages spoken in the country.
- `flags`: Flags associated with the country.
- `area`: The total area of the country in square kilometers.
- `population`: The population of the country.
- `borders`: The countries that share a border with the country.
- `region`: The region where the country is located.
- `subregion`: The subregion where the country is located.
- `capital`: The capital city of the country.
- `topLevelDomain`: The top-level domain of the country.
- `callingCodes`: The calling codes for the country.
- `altSpellings`: Alternative spellings or names for the country.
- `timezones`: The timezones followed in the country.
- `latlng`: The latitude and longitude coordinates of the country.
- `demonym`: The demonym for the people of the country.
- `nativeName`: The native name of the country.
- `numericCode`: The numeric code for the country.
- `cioc`: The CIO code for the country.

For example, to only include the `name`, `currencies`, `languages`, and `population` fields in the response, you can use the following query parameter: `fields=name,currencies,languages,population`.

## Example

If you want to retrieve information about Aruba including its name, currencies, languages, and population, you can make a request like this:

```
GET https://countries.mdiwanshu.workers.dev/?fields=name,currencies,languages,population
```

The response would look something like this:

```json
[
  {
    "name": {
      "common": "Aruba",
      "official": "Aruba",
      "nativeName": {
        "nld": {
          "official": "Aruba",
          "common": "Aruba"
        },
        "pap": {
          "official": "Aruba",
          "common": "Aruba"
        }
      }
    },
    "currencies": {
      "AWG": {
        "name": "Aruban florin",
        "symbol": "\u0192"
      }
    },
    "languages": {
      "nld": "Dutch",
      "pap": "Papiamento"
    },
    "population": 106766
  }
]
```

## Deploy on Your Own Device

### Setting Locally

To get started with the API, follow these steps:

1. Clone the repository: `git clone https://github.com/your/repository.git`
2. Install dependencies: `npm install`
3. Start the server: `npm start`

The API will be accessible at `http://localhost:your-port`.

### Deploying To Cloudflare Workers

To deploy the API to Cloudflare Workers, follow these steps:

1. Run The Script npm run deploy
2. Login To Your Account And You Will Get A Link To Your Worker
3. Copy The Link And Paste It In Your Browser

## Contributing

Contributions to the API are welcome! Feel free to fork the repository and submit pull requests.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
