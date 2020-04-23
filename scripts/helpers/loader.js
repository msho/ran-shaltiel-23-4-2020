
import * as domHelper from '../helpers/dom.js';

const weatherIcons = {
    // taken from https://www.npmjs.com/package/cli-spinners
    "interval": 150,
    "frames": [
        "☀️ ", "☀️ ", "☀️ ", "🌤 ", "⛅️ ", "🌥 ", "☁️ ", "🌧 ", "🌨 ", "🌧 ", "🌨 ", "🌧 ", "🌨 ",
        "⛈ ", "🌨 ", "🌧 ", "🌨 ", "☁️ ", "🌥 ", "⛅️ ", "🌤 ", "☀️ ", "☀️ "
    ]
} // weatherIcons

class Loader {
    constructor() {
        this.intNextIcon = 0;
    }

    setLoaderToElem(domElem) {
        if (this.loaderIntervalKey) {
            return;
        }

        this.domLoaderContainer = domElem;
        
        this.addDomLoader();

        this.loaderInterval((icon) => {
            this.domLoaderPre.innerHTML = icon;
        });
    }

    * iconGenerator() {
        while (true) {
            yield weatherIcons.frames[this.intNextIcon]
            this.intNextIcon = (this.intNextIcon + 1) % weatherIcons.frames.length;
        }
    } // genereateIcon

    loaderInterval(callback) {
        this.clearLoaderInterval();

        const genIcon = this.iconGenerator();
        this.loaderIntervalKey = window.setInterval(() => callback(genIcon.next().value), weatherIcons.interval);
    }

    addDomLoader() {
        if (this.domLoader) {
            return;
        }

        this.domLoader = domHelper.prependTemplate('loader', this.domLoaderContainer);
        this.domLoaderPre = this.domLoader.firstElementChild;
    }

    
    clearLoader(){
        this.clearLoaderInterval();
        this.removeDomLoader();
    }

    clearLoaderInterval() {
        if (!this.loaderIntervalKey) {
            return;
        }
        clearInterval(this.loaderIntervalKey);
        this.loaderIntervalKey = null;
    }

    removeDomLoader() {
        if (!this.domLoader) {
            return;
        }
        domHelper.removeElem(this.domLoader);
        this.domLoader = null;
    }

} // Loader

export default Loader;