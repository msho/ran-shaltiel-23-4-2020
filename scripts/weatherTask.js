/*** 
 * todos
 * * theme
 * loading
 * animation (toggle, new text, options (minimize<hide toggle headers>))
 * history managment
 * change search, fav to widget?
 * */ 

'use strict';

import Config, {defaultConfig} from './config.js';

import Toggle from './widgets/toggle.js';

import AccuWeather from './apis/accuWeather.js';

import HomePage from './pages/home.js';
import FavPage from './pages/fav.js';

import FavStorage from "./helpers/favoriteStorage.js";
import { changeAllElementsScale } from './helpers/temperture.js';

class WeatherTask {
    static domContainerId = 'container'

    constructor() {
        this.domContainer = document.getElementById(WeatherTask.domContainerId);

        this.config = new Config();

        this.favStorage = new FavStorage();

        this.accuWeather = new AccuWeather();

        this.initPages();

        this.dicPages[defaultConfig.nav].show();
        this.toggleHandler = new Toggle(this.domContainer, this.config);
        this.toggleHandler.selectToggle('nav', defaultConfig.nav);


        (this.dicPages[HomePage.PageId]).setToggleHandler(this.toggleHandler);

        this.handleEvents();

    }

    initPages() {
        this.dicPages = {};
        this.dicPages[HomePage.PageId] = new HomePage(this.domContainer, this.config, this.favStorage);
        this.dicPages[FavPage.PageId] = new FavPage(this.domContainer, this.config, this.favStorage);
    }

    handleEvents() {
        this.changeElementsScale(this.config.getTempertureScale());
        this.changeTheme(this.config.getTheme());

        this.toggleHandler.setOnNavigationToggleChange(val => this.changePage(val));
        this.toggleHandler.setOnFavToggleChange(val => this.dicPages[HomePage.PageId].favoriteToggleChanged(val));

        this.config.onScaleChanged = val => this.changeElementsScale(val);
        this.config.onThemeChanged = val => this.changeTheme(val);
    }

    changePage(strPage) {
        this.dicPages[strPage].show();
    }

    changeElementsScale(scale) {
        changeAllElementsScale(this.domContainer, scale);
    }

    changeTheme(theme) {
        this.domContainer.classList.remove('dark')
        this.domContainer.classList.remove('light')
        this.domContainer.classList.add(theme);
    }

} // WeatherTask

const weatherTask = new WeatherTask();