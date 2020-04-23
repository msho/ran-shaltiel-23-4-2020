const hourInMs = 3600000;

const tryParseJson = function(strJson) {
    try {
        const obj = JSON.parse(strJson);
        return obj;
    } catch(e) {return false};
}

const set = function (key, val, hoursToExpire) {
    let strVal = val;
    if (typeof val === 'object' && val !== null) {
        if (hoursToExpire) {
            val.expired = Date.now() + (hoursToExpire * hourInMs);
        }
        strVal = JSON.stringify(val);
    } // if object

    window.localStorage.setItem(key, strVal);

    return val;
}

const setObj = function (obj) {
    for (const [key, val] of Object.entries(obj)) {
        set(key, val);
    }
    return obj;
}

const get = function (key) {
    let strRes = window.localStorage.getItem(key);
    let objRes = tryParseJson(strRes);

    if (objRes && objRes.expired < Date.now()) {
        return null;
    }

    return objRes || strRes;
}

class ApiCache {
    constructor() {
        this.dicCities = {};
    }

    async get(storageKey, apiFunc, apiParam, hoursToExpire) {
        const storageKeyFull = `cache_${storageKey.toLowerCase()}`;
        apiParam = apiParam || storageKey;

        let res = get(storageKeyFull);
        if (res) {
            return res;
        }

        res = await apiFunc(apiParam);

        return set(storageKeyFull, res, hoursToExpire);
    }
} // ApiCache

export { ApiCache, set, setObj, get };