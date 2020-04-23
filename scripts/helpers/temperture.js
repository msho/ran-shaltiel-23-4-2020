const degreeSymbol = { celsius: '℃', fahrenheit: '℉' };

const setCurrentWeatherToDom = function (domTemperture, objTemperture, config) {

    let celsTemp = objTemperture && objTemperture.Metric && objTemperture.Metric.Value;
    let fahrTemp = objTemperture && objTemperture.Imperial && objTemperture.Imperial.Value;

    if (!celsTemp && !fahrTemp && (celsTemp !== 0 || fahrTemp !== 0)) {
        return;
    }

    setTempertureToDom(domTemperture, celsTemp, fahrTemp);

    changeElementScale(domTemperture, config.getTempertureScale());

} // setCurrentWeatherToDom

const setDailyWeatherToDom = function (domTemperture, objTemperture, config) {
    const temperture =  objTemperture.Maximum.Value;
    if (objTemperture.Maximum.Unit === 'F') {
        setTempertureToDom(domTemperture, null, temperture);
    } else {
        setTempertureToDom(domTemperture, temperture, null);
    }

    changeElementScale(domTemperture, config.getTempertureScale());
}

const changeAllElementsScale = function (domContainer, scale) {
    const arrDomTemp = domContainer.querySelectorAll('.temperture');
    for (const domTemp of arrDomTemp) {
        changeElementScale(domTemp, scale);
    }
}

function changeElementScale(domTemp, scale) {
    domTemp.innerText = domTemp.dataset[scale] + degreeSymbol[scale];
}

const setTempertureToDom = function (domTemperture, celsTemp, fahrTemp) {
    if (!celsTemp) {
        celsTemp = convertFahrToCels(fahrTemp)
    }
    if (!fahrTemp) {
        fahrTemp = convertCelsToFahr(celsTemp)
    }

    domTemperture.dataset.celsius = celsTemp;
    domTemperture.dataset.fahrenheit = fahrTemp;
    domTemperture.classList.add('temperture');
}

const convertFahrToCels = function (fTemp) {
    return ((fTemp - 32) * 5 / 9).toFixed(0);
}

const convertCelsToFahr = function (cTemp) {
    return ((cTemp * 1.8) + 32).toFixed(0);
}

export { setCurrentWeatherToDom, setDailyWeatherToDom, changeAllElementsScale };
