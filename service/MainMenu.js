import { V } from '../util/ViewUtil.js';
import { D } from '../constants/ParseRule.js';
export class MainMenu {
	constructor(menuBarElm) {
		this.menuBarElm = menuBarElm;
		const addTitleBtm = V.button('addTitleBtn', 'addBtn', 'Title');
		const addPageBtm = V.button('addPageBtm', 'addBtn', 'Page');
		const addKomaBtm = V.button('addKomaBtm', 'addBtn', 'Koma');
		const addFukidashiBtm = V.button('addFukidashiBtm', 'addBtn', 'Fukidashi');
		const addFukidashiEndBtm = V.button('addFukidashiEndBtm', 'addBtn', 'FEnd');
		this.addTitleBtm = addTitleBtm;
		this.addPageBtm = addPageBtm;
		this.addKomaBtm = addKomaBtm;
		this.addFukidashiBtm = addFukidashiBtm;
		this.addFukidashiEndBtm = addFukidashiEndBtm;
		V.append(menuBarElm, addTitleBtm);
		V.append(menuBarElm, addPageBtm);
		V.append(menuBarElm, addKomaBtm);
		V.append(menuBarElm, addFukidashiBtm);
		V.append(menuBarElm, addFukidashiEndBtm);
	}
	setTextArea(textareaElm) {
		this.textareaElm = textareaElm;
		V.ael(this.addTitleBtm, 'click', this.getSetTextFunc(D.defaultTitle.text));
		V.ael(this.addPageBtm, 'click', this.getSetTextFunc(D.defaultPage.text));
		V.ael(this.addKomaBtm, 'click', this.getSetTextFunc(D.defaultKoma.text));
		V.ael(this.addFukidashiBtm, 'click', this.getSetTextFunc(D.defaultFukidashi.text));
		V.ael(this.addFukidashiEndBtm, 'click', this.getSetTextFunc(D.defaultFukidashiEnd.text));
	}
	getSetTextFunc(text) {
		return () => {
			const cp = this.textareaElm.selectionStart;
			console.log(cp);
			const val = this.textareaElm.value + '';
			const isOnNewRow = val.substring(cp - 1, cp) === '\n';
			console.log(isOnNewRow);
			this.textareaElm.value = val.slice(0, cp) + (isOnNewRow ? '' : '\n') + text + val.slice(cp);
			this.textareaElm.focus();
		};
	}
	getOnClickCallback(func) {
		return (event) => {
			func(event);
		};
	}
}
