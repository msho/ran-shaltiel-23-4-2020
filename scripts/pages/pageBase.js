import {getTemplate} from "../helpers/dom.js";
import {attr} from '../helpers/dom.js';
import AccuWeather from "../apis/accuWeather.js";

class PageBase {
    constructor(domParent, strPageId, config, favStorage) {
        this.domParent = domParent;
        this.strPageName = strPageId;
        this.config = config;
        this.favStorage = favStorage;

        this.accuWeather = new AccuWeather();
        
        this.domPageContainer = this.domParent.getElementsByClassName('main')[0];
        this.fregPage = getTemplate(strPageId);
        this.domPage = null;
    }

    appendDomElem() {
        this.domPageContainer.appendChild(this.fregPage);
        this.domPage = this.domPageContainer.lastElementChild;

        this.initElements();
    }

    initElements() {
        console.warn('Please override "initElements" function in a child class. Thanks');
    }

    show() {
        let isPageExist = false;
        for (const domPage of this.domPageContainer.children) {
            if (domPage.id === this.strPageName) {
                domPage.classList.remove('hide')
                isPageExist = true;
            } else {
                domPage.classList.add('hide');
            }
        } //for each dom-page 

        if (!isPageExist) {
            this.appendDomElem();
        }
    } //showPage

    setWeatherImg(domImg, iconNum, desc) {
        attr(domImg, {
            src: AccuWeather.getIconImg(iconNum),
            alt: desc,
            title: desc
        });
    } // setWeatherImg

} // PageBase

export default PageBase;