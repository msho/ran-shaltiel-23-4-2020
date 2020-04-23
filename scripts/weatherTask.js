'use strict';

import Config, { defaultConfig } from './config.js';
import HistoryState from './historyState.js';

import Toggle from './widgets/toggle.js';

import AccuWeather from './apis/accuWeather.js';

import HomePage from './pages/home.js';
import FavPage from './pages/fav.js';

import FavStorage from "./helpers/favoriteStorage.js";
import { changeAllElementsScale } from './helpers/temperture.js';

class WeatherTask {
    static domContainerId = 'container'

    constructor() {
        this.domGrid = document.getElementById(WeatherTask.domContainerId);

        this.config = new Config();

        this.historyState = new HistoryState(this);

        this.favStorage = new FavStorage();

        this.accuWeather = new AccuWeather();

        this.initPages();

        this.initToggle();

        (this.dicPages[HomePage.PageId]).setToggleHandler(this.toggleHandler);

        this.handleEvents();

        this.handleMenu();

    }

    initPages() {
        this.dicPages = {};
        this.dicPages[HomePage.PageId] = new HomePage(this.domGrid, this.config, this.favStorage);
        this.dicPages[FavPage.PageId] = new FavPage(this.domGrid, this.config, this.favStorage);

        this.dicPages[defaultConfig.nav].show();
    }

    initToggle() {
        this.toggleHandler = new Toggle(this.domGrid, this.config);
        this.toggleHandler.selectToggle('nav', defaultConfig.nav);
    }

    handleEvents() {
        this.changeElementsScale(this.config.getTempertureScale());
        this.changeTheme(this.config.getTheme());

        this.toggleHandler.setOnNavigationToggleChange(val => this.changePage(val));
        this.toggleHandler.setOnFavToggleChange(val => this.dicPages[HomePage.PageId].favoriteToggleChanged(val));

        this.config.onScaleChanged = val => this.changeElementsScale(val);
        this.config.onThemeChanged = val => this.changeTheme(val);
    }

    handleMenu() {
        document.getElementById('showHideMenu').onclick = () => {
            const strSmallMenuClassName = 'mini-menu';
            if (this.domGrid.classList.contains(strSmallMenuClassName)) {
                this.domGrid.classList.remove(strSmallMenuClassName);
            } else {
                this.domGrid.classList.add(strSmallMenuClassName);
            }
        } // showHideMenu click
    }

    changePage(strPage, ignoreState) {
        if (!ignoreState) {
            this.historyState.onPageChange(strPage);
        }

        this.dicPages[strPage].show();
    }

    changeElementsScale(scale) {
        changeAllElementsScale(this.domGrid, scale);
    }

    changeTheme(theme) {
        this.domGrid.classList.remove('dark')
        this.domGrid.classList.remove('light')
        this.domGrid.classList.add(theme);
    }

} // WeatherTask

const weatherTask = new WeatherTask();