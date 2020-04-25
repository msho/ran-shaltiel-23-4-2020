import * as domHelper from './dom.js'

const appearTimeMs = 3000;

const showError = function(strMsg) {
    const domErr = createErrorElem();
    domErr.innerHTML = strMsg;
    domHelper.addClassForAWhile(domErr, appearTimeMs, 'show-error');
}

const createErrorElem = function() {
    const domErr = document.getElementById('error');
    if (domErr) {
        return domErr;
    }

    return domHelper.newElem('div', {class: 'error', id: 'error'}, document.body);
}

export {showError, appearTimeMs};