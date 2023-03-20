import { V } from '../util/ViewUtil.js';
export class PagesView {
	static SELECTED = 'selected';
	constructor(parentElm) {
		this.parentElm = parentElm;
		this.tab = V.div('tab', 'tab');
		this.pagesMain = V.div('pagesMain', 'pagesMain');
		this.tabMap = {};
		V.append(parentElm, this.tab);
		V.append(parentElm, this.pagesMain);
		this.buildTabs();
		this.buildPagesMain();
		this.getToggleFunc('pages')();
	}
	buildTabs() {
		this.tabPages = V.div('tabPages', 'tabPages');
		this.tabFormatted = V.div('tabFormatted', 'tabFormatted');
		this.tabJson = V.div('tabJson', 'tabJson');
		V.append(this.tabPages, V.span('tabPagesTitle', 'tabs', 'Pages'));
		V.append(this.tabFormatted, V.span('tabFormattedTitle', 'tabs', 'Formatted'));
		V.append(this.tabJson, V.span('tabPagesTitle', 'tabs', 'Json'));
		this.tabMap.pages = { tab: this.tabPages };
		this.tabMap.formatted = { tab: this.tabFormatted };
		this.tabMap.json = { tab: this.tabJson };
		V.append(this.tab, this.tabPages);
		V.append(this.tab, this.tabFormatted);
		V.append(this.tab, this.tabJson);
		V.onClick(this.tabPages, this.getToggleFunc('pages'));
		V.onClick(this.tabFormatted, this.getToggleFunc('formatted'));
		V.onClick(this.tabJson, this.getToggleFunc('json'));
	}
	buildPagesMain() {
		this.pages = V.div('pages', 'pages');
		this.formatted = V.div('formatted', 'formatted');
		this.json = V.div('json', 'json');
		this.tabMap.pages.page = this.pages;
		this.tabMap.formatted.page = this.formatted;
		this.tabMap.json.page = this.json;
		V.append(this.pagesMain, this.pages);
		V.append(this.pagesMain, this.formatted);
		V.append(this.pagesMain, this.json);
	}
	getToggleFunc(id) {
		return () => {
			for (const key in this.tabMap) {
				const value = this.tabMap[key];
				if (key === id) {
					V.addClass(value.tab, PagesView.SELECTED);
					V.addClass(value.page, PagesView.SELECTED);
				} else {
					V.removeClass(value.tab, PagesView.SELECTED);
					V.removeClass(value.page, PagesView.SELECTED);
				}
			}
		};
	}
	getPagesElm() {
		return this.pages;
	}
	getFormattedElm() {
		return this.formatted;
	}
	getJsonElm() {
		return this.json;
	}
}
