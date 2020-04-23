const attr = function (domElem, objAttr) {
    if (attr === null || typeof objAttr !== 'object') {
        return;
    }

    for (const [name, value] of Object.entries(objAttr)) {
        domElem.setAttribute(name, value);
    }
}

const newElem = function (name, objAttr, parent) {
    const domElem = document.createElement(name);
    attr(domElem, objAttr);

    if (parent) {
        parent.appendChild(domElem);
    }

    return domElem;
}

const removeElem = function (domElem) {
    domElem.parentElement.removeChild(domElem);
}

const getTemplate = function(nameOrDom) {
    if (typeof nameOrDom === 'string') {
        return document.getElementById(`${nameOrDom}-template`).content.cloneNode(true);
    } else  {
        return nameOrDom.content.cloneNode(true);
    }
}

const appendTemplate = function (nameOrDom, domContainer) {
    const freg = getTemplate(nameOrDom);
    domContainer.appendChild(freg);
    return domContainer.lastElementChild;
}

const prependTemplate = function (nameOrDom, domContainer) {
    const freg = getTemplate(nameOrDom);
    domContainer.prepend(freg);
    return domContainer.firstElementChild;
}

export { attr , newElem, appendTemplate, prependTemplate, getTemplate, removeElem };