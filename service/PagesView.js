import { V } from '../util/ViewUtil.js';
export class PagesView {
	static SELECTED = 'selected';
	constructor(parentElm) {
		this.parentElm = parentElm;
		this.tab = V.div('tab', 'tab');
		this.pagesMain = V.div('pagesMain', 'pagesMain');
		V.append(parentElm, this.tab);
		V.append(parentElm, this.pagesMain);
		this.buildPagesMain();
		this.buildTabs();
	}
	buildTabs() {
		this.tabPages = V.div('tabPages', 'tabPages');
		this.tabFormatted = V.div('tabFormatted', 'tabFormatted');
		this.tabJson = V.div('tabJson', 'tabJson');
		V.append(this.tabPages, V.span('tabPagesTitle', 'tabs', 'Pages'));
		V.append(this.tabFormatted, V.span('tabFormattedTitle', 'tabs', 'Formatted'));
		V.append(this.tabJson, V.span('tabPagesTitle', 'tabs', 'Json'));
		V.append(this.tab, this.tabPages);
		V.append(this.tab, this.tabFormatted);
		V.append(this.tab, this.tabJson);
		V.addClass(this.tabPages, PagesView.SELECTED);
		V.removeClass(this.tabFormatted, PagesView.SELECTED);
		V.removeClass(this.tabJson, PagesView.SELECTED);
		V.addClass(this.pages, PagesView.SELECTED);
		V.removeClass(this.formatted, PagesView.SELECTED);
		V.removeClass(this.json, PagesView.SELECTED);
		V.onClick(this.tabPages, this.getToggleFunc('pages'));
		V.onClick(this.tabFormatted, this.getToggleFunc('formatted'));
		V.onClick(this.tabJson, this.getToggleFunc('json'));
	}
	buildPagesMain() {
		this.pages = V.div('pages', 'pages');
		this.formatted = V.div('formatted', 'formatted');
		this.json = V.div('json', 'json');
		V.append(this.pagesMain, this.pages);
		V.append(this.pagesMain, this.formatted);
		V.append(this.pagesMain, this.json);
	}
	getToggleFunc(id) {
		return () => {
			if (id === 'pages') {
				V.addClass(this.tabPages, PagesView.SELECTED);
				V.removeClass(this.tabFormatted, PagesView.SELECTED);
				V.removeClass(this.tabJson, PagesView.SELECTED);
				V.addClass(this.pages, PagesView.SELECTED);
				V.removeClass(this.formatted, PagesView.SELECTED);
				V.removeClass(this.json, PagesView.SELECTED);
			} else if (id === 'formatted') {
				V.removeClass(this.tabPages, PagesView.SELECTED);
				V.addClass(this.tabFormatted, PagesView.SELECTED);
				V.removeClass(this.tabJson, PagesView.SELECTED);
				V.removeClass(this.pages, PagesView.SELECTED);
				V.addClass(this.formatted, PagesView.SELECTED);
				V.removeClass(this.json, PagesView.SELECTED);
			} else if (id === 'json') {
				V.removeClass(this.tabPages, PagesView.SELECTED);
				V.removeClass(this.tabFormatted, PagesView.SELECTED);
				V.addClass(this.tabJson, PagesView.SELECTED);
				V.removeClass(this.pages, PagesView.SELECTED);
				V.removeClass(this.formatted, PagesView.SELECTED);
				V.addClass(this.json, PagesView.SELECTED);
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
