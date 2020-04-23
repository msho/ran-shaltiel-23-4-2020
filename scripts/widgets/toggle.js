const SelectedCssName = 'selected';

class Toggle {
    constructor(domContainer, config) {
        this.domContainer = domContainer;
        this.config = config;

        this.dicEvents = {};

        this.createTogglesElements();
        
        this.initTogglesEvents();
    }

    selectToggle(name, val) {
        const domToggle = this.getToggleByName(name);
        const arrOptions = domToggle.querySelectorAll('a');
        
        this.changeCssClass(arrOptions, this.getToggleOption(arrOptions, val));
    }

    getToggleOption(arrOptions, val) {
        for (const domOption of arrOptions) {
            if (domOption.dataset.toggleVal === val) {
                return domOption;
            }
        }

        return null;
    }

    getToggleByName(name) {
        const arrAllToggles = this.domContainer.querySelectorAll('.toggle');
        for (const domToggle of arrAllToggles) {
            if (domToggle.dataset.toggleName === name) {
                return domToggle;
            }
        }
        return null;
    }

    initTogglesEvents() {

        this.arrDomToggles = this.domContainer.getElementsByClassName('toggle');
        for (const domToggleContainer of this.arrDomToggles) {
            this.handleToggleClicks(domToggleContainer);
        }
    } // initToggles

    createTogglesElements() {
        const arrDomTogglePlaceholder = this.domContainer.getElementsByClassName('create-toggle');
        const templateToggle = document.getElementById('toggle-template');
        while (arrDomTogglePlaceholder[0]) {
            const domTogglePlaceHolder = arrDomTogglePlaceholder[0];
            const domNewToggle = templateToggle.firstElementChild.cloneNode(true);
            const toggleData = domTogglePlaceHolder.dataset;
            
            domNewToggle.dataset.toggleName = toggleData.name;
            this.createToggleHeader(domNewToggle, toggleData.header)
            this.createToggleOptionElements(domNewToggle, toggleData.vals);

            // This removes 'create-toggle' class thus removing an item from arrDomTogglePlaceholder as well
            domTogglePlaceHolder.outerHTML = domNewToggle.outerHTML; 
        } 
    } // createToggleOptionElements

    createToggleHeader(domToggle, strHeader) {
        const domHeader = domToggle.querySelector('h3');
        if (strHeader) {
            domHeader.innerText = strHeader;
            return;
        } 

        domHeader.classList.add('hide');
    } // createToggleHeader

    createToggleOptionElements(domToggle, strOptions) {
        const options = JSON.parse(strOptions);
        const templateOptions = document.getElementById('toggle-option-template');

        for (const [val, text] of Object.entries(options)) {
            const domNewOption = templateOptions.firstElementChild.cloneNode(true);

            domNewOption.dataset.toggleVal = val;
            domNewOption.innerText = text;

            if (this.config.get(domToggle.dataset.toggleName) !== val) {
                domNewOption.classList.remove('selected');
            } 

            domToggle.appendChild(domNewOption);
        }
    } // createToggleOptionElements

    handleToggleClicks(domToggleContainer) {
        const arrDomToggleItems = domToggleContainer.getElementsByTagName('a');
        for (const domToggleItem of arrDomToggleItems) {
            domToggleItem.addEventListener('click', () => this.onToggleItemClick(arrDomToggleItems, domToggleContainer, domToggleItem));
        } //for each toggle item
    } // handleToggleClick

    onToggleItemClick(arrDomToggleItems, domToggleContainer, domToggleClicked) {
        this.changeCssClass(arrDomToggleItems, domToggleClicked);

        const toggleName = domToggleContainer.dataset.toggleName;
        const toggleValue = domToggleClicked.dataset.toggleVal;
        this.config.set(toggleName, toggleValue);

        this.toggleItemChanged(toggleName, toggleValue);
    } // onToggleItemClick

    changeCssClass(arrDomToggleItems, domToggleClicked) {
        for (const domToggle of arrDomToggleItems) {
            domToggle.classList.remove(SelectedCssName);
        }
        domToggleClicked.classList.add(SelectedCssName);
    } // changeCssClass

    toggleItemChanged(toggleName, toggleVal) {
        for (const [name, method] of Object.entries(this.dicEvents)) {
            if (name === toggleName && typeof method === 'function') {
                method(toggleVal);
            }
        }

    } // toggleItemChanged

    setToggleEventHandler(name, funcOnEvent) {
        this.dicEvents[name] = funcOnEvent;
    }

    setOnNavigationToggleChange(funcOnNav) {
        this.setToggleEventHandler('nav', funcOnNav);
    }

    setOnThemeToggleChange(funcOnTheme) {
        this.setToggleEventHandler('theme', funcOnTheme);
    }

    setOnScaleToggleChange(funcOnSclae) {
        this.setToggleEventHandler('scale', funcOnSclae);
    }

    setOnFavToggleChange(funcOnFav) {
        this.setToggleEventHandler('make-fav', funcOnFav);
    }
    
} // Toggle

export default Toggle;