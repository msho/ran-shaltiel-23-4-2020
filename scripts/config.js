import * as storage from "./helpers/storage.js";

const defaultConfig = { scale: 'celsius', theme: 'light', nav: 'home' };

class Config {
    constructor() {
        this.onScaleChanged = null;
        this.onThemeChanged = null;

        this.setDefaultIfNeeded();


    }

    get(key) {
        return storage.get(key);
    }

    set(key, value) {
        if (Object.keys(defaultConfig).indexOf(key) === -1) {
            return;
        }

        storage.set(key, value);

        key ==='scale' && typeof this.onScaleChanged === 'function' && this.onScaleChanged(value);
        key ==='theme' && typeof this.onThemeChanged === 'function' && this.onThemeChanged(value);
    }

    setDefaultIfNeeded() {
        for (const [propery, value] of Object.entries(defaultConfig)) {
            if (this.get(propery) === null) {
                this.set(propery, value);
            }
        }
    }

    setTempertureScale(strScale) {
        storage.set('scale', strScale);

    }

    getTempertureScale() {
        return this.get('scale');
    }

    setTheme(strTheme) {
        this.set('theme', strTheme);
    }

    getTheme() {
        return this.get('theme');
    }
} // Config

export default Config;
export {defaultConfig};

