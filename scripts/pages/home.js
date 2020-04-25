import PageBase from "./pageBase.js";

import { setCurrentWeatherToDom, setDailyWeatherToDom } from "../helpers/temperture.js";
import { appendTemplate, newElem } from "../helpers/dom.js";
import Loader from "../helpers/loader.js";

import getDefaultLocation from "../apis/currentLocation.js";

class Home extends PageBase {
    static PageId = 'home';
    constructor(domContainer, config, favStorage) {
        super(domContainer, Home.PageId, config, favStorage);

        this.showDefaultResult()

        this.dataLoader = new Loader();

    }

    setToggleHandler(toggleHandler) {
        this.toggleHandler = toggleHandler;
    }

    favoriteToggleChanged(toogleFavValue) {
        const isFav = toogleFavValue === 'fav';
        if (isFav) {
            this.favStorage.addFav(this.locationDetails.key, this.locationDetails.name, this.locationDetails.weather);
        } else {
            this.favStorage.removeFav(this.locationDetails.key);
        }
    }

    initElements() {
        // called from parent
        const findInPage = this.domPage.querySelector.bind(this.domPage);
        this.domSearchInput = findInPage('#input-search');
        this.domWeatherIcon = findInPage('.basic-info img')
        this.domResultName = findInPage('#result-name');
        this.domResultTemp = findInPage('#result-temp');
        this.domResultDescription = findInPage('.result-desciption');
        this.domForecastContainer = findInPage('.weather-list');
        this.dataSeach = findInPage('#search-data');

        this.initElementsEvents();
    } // initElements

    initElementsEvents() {
        this.domSearchInput.addEventListener('input', this.setSearchData.bind(this));
    }

    async setSearchData() {
        //occurs on search key press
        const locationName = this.domSearchInput.value;
        const locationKey = this.getLocationKey(locationName);

        if (locationKey) {
            this.setNewLocation(locationName, locationKey);
            return;
        }

        if (locationName.length < 1) {
            return;
        }

        this.dataLoader.setLoaderToElem(this.domSearchInput.parentElement);

        const arrCities = await this.accuWeather.getCities(locationName);
        this.fillDataList(arrCities);

        this.dataLoader.clearLoader();

    } // setSearchData

    fillDataList(arrCities) {
        this.dataSeach.innerHTML = '';
        for (const objLocation of arrCities) {
            newElem('option', { value: objLocation.LocalizedName, key: objLocation.Key }, this.dataSeach)
        }
    }

    getLocationKey(locationName) {
        for (const domOption of this.dataSeach.children) {
            if (domOption.getAttribute('value') === locationName) {
                return domOption.getAttribute('key');
            }
        }
        return null;
    }

    async showDefaultResult() {
        const arrDefaultLocation = await getDefaultLocation();

        const locationDetails = await this.accuWeather.getLocationByLonLat(arrDefaultLocation);

        this.setNewLocation(locationDetails.EnglishName, locationDetails.Key);

    } // showDefaultResult

    setNewLocation(name, key) {
        this.locationDetails = { name: name, key: key };

        this.domSearchInput.value = name;
        this.domResultName.innerText = name;

        this.handleToggleFav();

        const currentWeatherLoader = new Loader();
        currentWeatherLoader.setLoaderToElem(this.domResultTemp.parentElement);

        this.accuWeather.getCurrentWeather(key)
            .then(obj => {
                this.setCurrentWeather(obj);
                currentWeatherLoader.clearLoader();

            }).catch(currentWeatherLoader.clearLoader.bind(currentWeatherLoader));


        this.accuWeather.getForecast(key).then(obj => this.setForecast(obj));

    } // getLocationKeyDetails

    handleToggleFav() {
        const strToggleVal = this.favStorage.isFav(this.locationDetails.key) ? 'fav' : 'not-fav';
        this.toggleHandler.selectToggle('make-fav', strToggleVal)
    }

    setCurrentWeather(obj) {

        this.locationDetails.weather = obj;

        this.setWeatherImg(this.domWeatherIcon, obj.WeatherIcon, obj.WeatherText);

        this.domResultDescription.innerText = obj.WeatherText;

        setCurrentWeatherToDom(this.domResultTemp, obj.Temperature, this.config);
    } // setCurrentWeather

    setForecast(obj) {
        if (!obj || !obj.DailyForecasts) {
            return;
        }

        this.domForecastContainer.innerHTML = '';

        const templateDay = document.getElementById('weather-list-item-template');
        for (const objDayTemp of obj.DailyForecasts) {
            const domDay = appendTemplate(templateDay, this.domForecastContainer);

            this.setDomDayDetails(domDay, objDayTemp);
        }
    } // setForecast

    setDomDayDetails(domDay, objDayTemp) {
        domDay.querySelector('.item-name').innerText = new Date(objDayTemp.Date).toLocaleDateString('en-US', { weekday: 'long' });
        this.setWeatherImg(domDay.querySelector('div > img'), objDayTemp.Day.Icon, objDayTemp.Day.IconPhrase);
        setDailyWeatherToDom(domDay.querySelector('.item-temp'), objDayTemp.Temperature, this.config);
    }
}

export default Home;
