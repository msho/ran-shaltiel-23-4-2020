import { ApiCache } from '../helpers/storage.js';
import { showError } from '../helpers/errors.js';

const baseApiUrl = 'https://dataservice.accuweather.com/';
const locationApiUrl = `${baseApiUrl}locations/v1/cities/`;

class WeatherHandler {

    static getIconImg(weatherId) {
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
    //static ApiKey = 'MGgtabuJOT7GxB8Fd0jcAXS4z00Md8lA';
        static ApiKey = 'LZf4XK3kGHRgqhtutmnWn27uAjSXck8c';

    constructor(apiKey) {
        this.apiKey = apiKey || AccuWeather.ApiKey;
    }

    async getCities(strLocation) {
        const apiPath = `${locationApiUrl}autocomplete?apikey=${this.apiKey}&q=${strLocation}`;
        
        return await this.requestApi(apiPath);
    }

    async getLocationByLocation(arrLongLat) {
        const apiPath = `${locationApiUrl}geoposition/search?apikey=${this.apiKey}&q=${arrLongLat.toString()}&toplevel=true `;
        
        return await this.requestApi(apiPath);
    }

    async getCurrentWeather(locationKey) {
        const apiPath = `${baseApiUrl}currentconditions/v1/${locationKey}?apikey=${this.apiKey}`;
        
        const arrCurrentWeather =  await this.requestApi(apiPath);
        return arrCurrentWeather && arrCurrentWeather[0];
    }

    async getForecast(locationKey) {
        const apiPath = `${baseApiUrl}forecasts/v1/daily/5day/${locationKey}?apikey=${this.apiKey}`;
        
        return await this.requestApi(apiPath);
    }

    requestApi(url, body, method) {

        const xhr = new XMLHttpRequest();
        method = method || 'GET'
        xhr.open(method, url, true);

        return new Promise((ok, err) => {
            xhr.onload = (obj) => {
                const reqResp = obj.target;
                
                if (reqResp.status < 200 || reqResp.status > 300) {
                    showError(`<p>AccuWeather Api error</p><p>return status ${reqResp.status}</p>`);

                    err(`AccuWeather returned status ${reqResp.status}`);
                } else {
                    ok(JSON.parse(reqResp.response));
                }
            }; // onload
            xhr.addEventListener("error", this.showError.bind(this));
            xhr.addEventListener("abort", this.showError.bind(this));

            body ? xhr.send(body) : xhr.send();
        }); //promise returned
    } // requestApi

    showError(e) {
        console.error(e);
        showError(`<p>AccuWeather Api error</p><p>return status ${e.target.status}</p>`);
    }
} // AccuWeather

export default WeatherHandler;