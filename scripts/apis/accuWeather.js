import { ApiCache } from '../helpers/storage.js';

const baseApiUrl = 'http://dataservice.accuweather.com/';
const locationApiUrl = `${baseApiUrl}locations/v1/cities/`;

//TODO: del me
const cities = [{
    "Version": 1,
    "Key": "215854",
    "Type": "Location",
    "Rank": 31,
    "LocalizedName": "Tel Aviv",
    "Country": {
        "ID": "IL",
        "LocalizedName": "Israel"
    },
    "AdministrativeArea": {
        "ID": "TA",
        "LocalizedName": "Tel Aviv"
    }
},
{
    "Version": 1,
    "Key": "3431644",
    "Type": "Location",
    "Rank": 45,
    "LocalizedName": "Telanaipura",
    "Country": {
        "ID": "ID",
        "LocalizedName": "Indonesia"
    },
    "AdministrativeArea": {
        "ID": "JA",
        "LocalizedName": "Jambi"
    }
},
{
    "Version": 1,
    "Key": "300558",
    "Type": "Location",
    "Rank": 45,
    "LocalizedName": "Telok Blangah New Town",
    "Country": {
        "ID": "SG",
        "LocalizedName": "Singapore"
    },
    "AdministrativeArea": {
        "ID": "05",
        "LocalizedName": "South West"
    }
},
{
    "Version": 1,
    "Key": "325876",
    "Type": "Location",
    "Rank": 51,
    "LocalizedName": "Telford",
    "Country": {
        "ID": "GB",
        "LocalizedName": "United Kingdom"
    },
    "AdministrativeArea": {
        "ID": "TFW",
        "LocalizedName": "Telford and Wrekin"
    }
},
{
    "Version": 1,
    "Key": "169072",
    "Type": "Location",
    "Rank": 51,
    "LocalizedName": "Telavi",
    "Country": {
        "ID": "GE",
        "LocalizedName": "Georgia"
    },
    "AdministrativeArea": {
        "ID": "KA",
        "LocalizedName": "Kakheti"
    }
},
{
    "Version": 1,
    "Key": "230611",
    "Type": "Location",
    "Rank": 51,
    "LocalizedName": "Telsiai",
    "Country": {
        "ID": "LT",
        "LocalizedName": "Lithuania"
    },
    "AdministrativeArea": {
        "ID": "TE",
        "LocalizedName": "Telšiai"
    }
},
{
    "Version": 1,
    "Key": "2723742",
    "Type": "Location",
    "Rank": 55,
    "LocalizedName": "Telégrafo",
    "Country": {
        "ID": "BR",
        "LocalizedName": "Brazil"
    },
    "AdministrativeArea": {
        "ID": "PA",
        "LocalizedName": "Pará"
    }
},
{
    "Version": 1,
    "Key": "186933",
    "Type": "Location",
    "Rank": 55,
    "LocalizedName": "Tela",
    "Country": {
        "ID": "HN",
        "LocalizedName": "Honduras"
    },
    "AdministrativeArea": {
        "ID": "AT",
        "LocalizedName": "Atlántida"
    }
},
{
    "Version": 1,
    "Key": "3453754",
    "Type": "Location",
    "Rank": 55,
    "LocalizedName": "Telaga Asih",
    "Country": {
        "ID": "ID",
        "LocalizedName": "Indonesia"
    },
    "AdministrativeArea": {
        "ID": "JB",
        "LocalizedName": "West Java"
    }
},
{
    "Version": 1,
    "Key": "3453755",
    "Type": "Location",
    "Rank": 55,
    "LocalizedName": "Telagamurni",
    "Country": {
        "ID": "ID",
        "LocalizedName": "Indonesia"
    },
    "AdministrativeArea": {
        "ID": "JB",
        "LocalizedName": "West Java"
    }
}
];

const locationLocation = {
    "Version": 1,
    "Key": "215854",
    "Type": "Location",
    "Rank": 31,
    "LocalizedName": "Tel Aviv",
    "EnglishName": "Tel Aviv",
    "PrimaryPostalCode": "",
    "Region": {
        "ID": "MEA",
        "LocalizedName": "Middle East",
        "EnglishName": "Middle East"
    },
    "Country": {
        "ID": "IL",
        "LocalizedName": "Israel",
        "EnglishName": "Israel"
    },
    "AdministrativeArea": {
        "ID": "TA",
        "LocalizedName": "Tel Aviv",
        "EnglishName": "Tel Aviv",
        "Level": 1,
        "LocalizedType": "District",
        "EnglishType": "District",
        "CountryID": "IL"
    },
    "TimeZone": {
        "Code": "IDT",
        "Name": "Asia/Jerusalem",
        "GmtOffset": 3,
        "IsDaylightSaving": true,
        "NextOffsetChange": "2020-10-24T23:00:00Z"
    },
    "GeoPosition": {
        "Latitude": 32.045,
        "Longitude": 34.77,
        "Elevation": {
            "Metric": {
                "Value": 34,
                "Unit": "m",
                "UnitType": 5
            },
            "Imperial": {
                "Value": 111,
                "Unit": "ft",
                "UnitType": 0
            }
        }
    },
    "IsAlias": false,
    "SupplementalAdminAreas": [],
    "DataSets": [
        "AirQualityCurrentConditions",
        "AirQualityForecasts",
        "Alerts",
        "ForecastConfidence"
    ]
};

const currentWeather = [{
    "LocalObservationDateTime": "2020-04-22T13:41:00+02:00",
    "EpochTime": 1587555660,
    "WeatherText": "Mostly sunny",
    "WeatherIcon": 2,
    "HasPrecipitation": false,
    "PrecipitationType": null,
    "IsDayTime": true,
    "Temperature": {
        "Metric": {
            "Value": 17.5,
            "Unit": "C",
            "UnitType": 17
        },
        "Imperial": {
            "Value": 64,
            "Unit": "F",
            "UnitType": 18
        }
    },
    "MobileLink": "http://m.accuweather.com/en/ch/petit-cortaillod/1000/current-weather/1000?lang=en-us",
    "Link": "http://www.accuweather.com/en/ch/petit-cortaillod/1000/current-weather/1000?lang=en-us"
}];

const day5 = {
    "Headline": {
        "EffectiveDate": "2020-04-24T13:00:00-03:00",
        "EffectiveEpochDate": 1587744000,
        "Severity": 3,
        "Text": "Rain and thunderstorms Friday afternoon through Saturday evening",
        "Category": "thunderstorm",
        "EndDate": "2020-04-26T01:00:00-03:00",
        "EndEpochDate": 1587873600,
        "MobileLink": "http://m.accuweather.com/en/ar/torre-de-los-ingleses/3000/extended-weather-forecast/3000?lang=en-us",
        "Link": "http://www.accuweather.com/en/ar/torre-de-los-ingleses/3000/daily-weather-forecast/3000?lang=en-us"
    },
    "DailyForecasts": [{
        "Date": "2020-04-22T07:00:00-03:00",
        "EpochDate": 1587549600,
        "Temperature": {
            "Minimum": {
                "Value": 61,
                "Unit": "F",
                "UnitType": 18
            },
            "Maximum": {
                "Value": 67,
                "Unit": "F",
                "UnitType": 18
            }
        },
        "Day": {
            "Icon": 4,
            "IconPhrase": "Intermittent clouds",
            "HasPrecipitation": false
        },
        "Night": {
            "Icon": 35,
            "IconPhrase": "Partly cloudy",
            "HasPrecipitation": false
        },
        "Sources": [
            "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/ar/torre-de-los-ingleses/3000/daily-weather-forecast/3000?day=1&lang=en-us",
        "Link": "http://www.accuweather.com/en/ar/torre-de-los-ingleses/3000/daily-weather-forecast/3000?day=1&lang=en-us"
    },
    {
        "Date": "2020-04-23T07:00:00-03:00",
        "EpochDate": 1587636000,
        "Temperature": {
            "Minimum": {
                "Value": 67,
                "Unit": "F",
                "UnitType": 18
            },
            "Maximum": {
                "Value": 72,
                "Unit": "F",
                "UnitType": 18
            }
        },
        "Day": {
            "Icon": 4,
            "IconPhrase": "Intermittent clouds",
            "HasPrecipitation": false
        },
        "Night": {
            "Icon": 36,
            "IconPhrase": "Intermittent clouds",
            "HasPrecipitation": false
        },
        "Sources": [
            "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/ar/torre-de-los-ingleses/3000/daily-weather-forecast/3000?day=2&lang=en-us",
        "Link": "http://www.accuweather.com/en/ar/torre-de-los-ingleses/3000/daily-weather-forecast/3000?day=2&lang=en-us"
    },
    {
        "Date": "2020-04-24T07:00:00-03:00",
        "EpochDate": 1587722400,
        "Temperature": {
            "Minimum": {
                "Value": 64,
                "Unit": "F",
                "UnitType": 18
            },
            "Maximum": {
                "Value": 73,
                "Unit": "F",
                "UnitType": 18
            }
        },
        "Day": {
            "Icon": 12,
            "IconPhrase": "Showers",
            "HasPrecipitation": true,
            "PrecipitationType": "Rain",
            "PrecipitationIntensity": "Light"
        },
        "Night": {
            "Icon": 18,
            "IconPhrase": "Rain",
            "HasPrecipitation": true,
            "PrecipitationType": "Rain",
            "PrecipitationIntensity": "Light"
        },
        "Sources": [
            "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/ar/torre-de-los-ingleses/3000/daily-weather-forecast/3000?day=3&lang=en-us",
        "Link": "http://www.accuweather.com/en/ar/torre-de-los-ingleses/3000/daily-weather-forecast/3000?day=3&lang=en-us"
    },
    {
        "Date": "2020-04-25T07:00:00-03:00",
        "EpochDate": 1587808800,
        "Temperature": {
            "Minimum": {
                "Value": 62,
                "Unit": "F",
                "UnitType": 18
            },
            "Maximum": {
                "Value": 67,
                "Unit": "F",
                "UnitType": 18
            }
        },
        "Day": {
            "Icon": 15,
            "IconPhrase": "Thunderstorms",
            "HasPrecipitation": true,
            "PrecipitationType": "Rain",
            "PrecipitationIntensity": "Moderate"
        },
        "Night": {
            "Icon": 12,
            "IconPhrase": "Showers",
            "HasPrecipitation": true,
            "PrecipitationType": "Rain",
            "PrecipitationIntensity": "Light"
        },
        "Sources": [
            "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/ar/torre-de-los-ingleses/3000/daily-weather-forecast/3000?day=4&lang=en-us",
        "Link": "http://www.accuweather.com/en/ar/torre-de-los-ingleses/3000/daily-weather-forecast/3000?day=4&lang=en-us"
    },
    {
        "Date": "2020-04-26T07:00:00-03:00",
        "EpochDate": 1587895200,
        "Temperature": {
            "Minimum": {
                "Value": 64,
                "Unit": "F",
                "UnitType": 18
            },
            "Maximum": {
                "Value": 69,
                "Unit": "F",
                "UnitType": 18
            }
        },
        "Day": {
            "Icon": 8,
            "IconPhrase": "Dreary",
            "HasPrecipitation": false
        },
        "Night": {
            "Icon": 15,
            "IconPhrase": "Thunderstorms",
            "HasPrecipitation": true,
            "PrecipitationType": "Rain",
            "PrecipitationIntensity": "Moderate"
        },
        "Sources": [
            "AccuWeather"
        ],
        "MobileLink": "http://m.accuweather.com/en/ar/torre-de-los-ingleses/3000/daily-weather-forecast/3000?day=5&lang=en-us",
        "Link": "http://www.accuweather.com/en/ar/torre-de-los-ingleses/3000/daily-weather-forecast/3000?day=5&lang=en-us"
    }
    ]
};

class WeatherHandler {

    static getIconImg(weatherId) {
        //weatherId = (weatherId < 10) ? `0${weatherId}` : weatherId;
        return `https://www.accuweather.com/images/weathericons/${weatherId}.svg`;
    }

    constructor(apiKey) {
        this.accuWeather = new AccuWeather(apiKey);
        this.cache = new ApiCache();
    }

    async getCities(strLocation) {
        return this.cache.get(strLocation, 
            this.accuWeather.getCities.bind(this.accuWeather))
    }

    async getLocationByLonLat(arrLongLat) {
        return this.cache.get(`location_${arrLongLat.toString()}`,
            this.accuWeather.getLocationByLocation.bind(this.accuWeather), arrLongLat)
    }

    async getCurrentWeather(locationKey) {
        return this.cache.get(`current_${locationKey}`,
            this.accuWeather.getCurrentWeather.bind(this.accuWeather), locationKey, 3)
    }

    async getForecast(locationKey) {
        return this.cache.get(`forecast_${locationKey}`,
            this.accuWeather.getForecast.bind(this.accuWeather), locationKey, 3)
    }

} // WeatherHandler

class AccuWeather {
    static ApiKey = 'GqE2gwiUXUPAVsdt05IthqkmM0kQWuWP';

    constructor(apiKey) {
        this.apiKey = apiKey || AccuWeather.ApiKey;
    }

    async getCities(strLocation) {
        const apiPath = `${locationApiUrl}autocomplete?apikey=${this.apiKey}&q=${strLocation}`;
        console.log(apiPath);
        //return cities;
        return await this.requestApi(apiPath);
    }

    async getLocationByLocation(arrLongLat) {
        const apiPath = `${locationApiUrl}geoposition/search?apikey=${this.apiKey}&q=${arrLongLat.toString()}&toplevel=true `;
        console.log(apiPath);
        
        //return locationLocation;
        return await this.requestApi(apiPath);
    }

    async getCurrentWeather(locationKey) {
        const apiPath = `${baseApiUrl}currentconditions/v1/${locationKey}?apikey=${this.apiKey}`;
        console.log(apiPath);
        
        //return currentWeather;
        return await this.requestApi(apiPath);
    }

    async getForecast(locationKey) {
        const apiPath = `${baseApiUrl}forecasts/v1/daily/5day/${locationKey}?apikey=${this.apiKey}`;
        console.log(apiPath);
        
        //return day5;
        return await this.requestApi(apiPath);
    }

    requestApi(url, body, method) {
        console.log('starting req' + url);

        const xhr = new XMLHttpRequest();
        method = method || 'GET'
        xhr.open(method, url);

        return new Promise((ok, err) => {
            xhr.onload = (obj) => {
                const reqResp = obj.target;
                console.log(reqResp);
                console.log('');

                if (reqResp.status < 200 || reqResp.status > 300) {
                    err(`AccuWeather returned status ${reqResp.status}`);
                } else {
                    ok(JSON.parse(reqResp.response));
                }
            }

            body ? xhr.send(body) : xhr.send();
        }); //promise returned
    } // requestApi
} // AccuWeather

export default WeatherHandler;