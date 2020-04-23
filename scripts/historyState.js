class HistoryState {
    constructor(weatherTask) {
        this.weatherTask = weatherTask;
        this.init();
    }

    init() {
        onpopstate = (e) => {
            if (e.state) {
                this.weatherTask.changePage(e.state.page, true);
            }
        }
    }

    onPageChange(strPage) {
        history.pushState({page: strPage}, strPage, '#' + strPage);
    }
} // HistoryState

export default HistoryState;