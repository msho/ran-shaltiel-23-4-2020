import * as storage from './storage.js';
const favKey = 'fav!'
class FavoriteStorage {

    constructor(){
        this.arrOnFavChanged = [];
    }

    setOnFavChanged(func) {
        this.arrOnFavChanged.push(func);
    }

    addFav(locationId, locationName, details) {
        const dicFav = this.getAllFav();

        dicFav[locationId] = locationName;
        storage.set(favKey, dicFav);

        this.callEvents('added', {key: locationId, name: locationName, details: details});
    }

    removeFav(locationId) {
        const dicFav = this.getAllFav();
        delete dicFav[locationId];
        storage.set(favKey, dicFav);

        this.callEvents('removed', {key: locationId});
    }

    callEvents(action, obj)  {
        for (const func of this.arrOnFavChanged) {
            func(action, obj);
        }
    }

    isFav(locationId) {
        const dicFav = this.getAllFav();
        return dicFav.hasOwnProperty(locationId);
    }

    getAllFav() {
        return storage.get(favKey) || {};
    }
} // FavoriteStorage
export default FavoriteStorage;