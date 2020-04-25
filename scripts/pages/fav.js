import PageBase from "./pageBase.js";

import * as domHelper from '../helpers/dom.js';
import * as temperture from '../helpers/temperture.js';

class Favorite extends PageBase {
    static PageId = 'fav';
    constructor(domContainer, config, favStorage) {
        super(domContainer, Favorite.PageId, config, favStorage);

        favStorage.setOnFavChanged(this.setOnFavChanged.bind(this));

        this.isInit = false;
    }

    initElements() {
        this.showFavorites()
        this.isInit = true;
    }

    showFavorites() {
        this.favContainer = this.domPage.querySelector('.weather-list');

        const templateFav = document.getElementById('weather-list-item-template');

        const objAllFav = this.favStorage.getAllFav();
        for (const [key, name] of Object.entries(objAllFav)) {
            const domFav = domHelper.appendTemplate(templateFav, this.favContainer);

            this.accuWeather.getCurrentWeather(key).then(obj =>
                this.setWeatherToLocation(domFav, name, obj));
        }
    } // showFavorites

    setWeatherToLocation(domFav, name, obj) {
        domFav.id = `fav-item-${obj.Key}`;
        domFav.querySelector('.item-name').innerText = name;

        this.setWeatherImg(domFav.querySelector('div > img'), obj.WeatherIcon, obj.WeatherText);
        temperture.setCurrentWeatherToDom(domFav.querySelector('.item-temp'), obj.Temperature, this.config);
    }

    setOnFavChanged(method, obj) {
        if (!this.isInit) {
            return;
        }

        if (method === 'added') {
            const domItem = domHelper.appendTemplate('weather-list-item', this.favContainer);
            this.setWeatherToLocation(domItem, obj.name, obj.details);
        } else if (method === 'removed') {
            this.removeItem(obj.key)
        }
    }

    removeItem(key) {
        const domItem = document.getElementById(`fav-item-${key}`);
        if (domItem) {
            domHelper.removeElem(domItem);
        }
    }
} // Fav

export default Favorite;