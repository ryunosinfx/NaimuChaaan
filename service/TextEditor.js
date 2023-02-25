import { V } from '../util/ViewUtil.js';
import { MangaNaimuParser } from '../util/MangaNaimuParser.js';
export class TextEditor {
	constructor(textareaElm, onEditCallBack = () => {}) {
		this.textareaElm = textareaElm;
		this.onEditCallBack = onEditCallBack;
		V.ael(this.textareaElm, 'input', this.getOnInput());
		this.editCount = 0;
	}
	setOutputElm(formattedElm, jsonElm) {
		this.formattedElm = formattedElm;
		this.jsonElm = jsonElm;
	}
	getOnInput() {
		return (event) => {
			this.editCount++;
			const value = this.textareaElm.value;
			this.lastEdit = this.editCount + Date.now();
			const parsed = MangaNaimuParser.parse(value);
			console.log(event, parsed);
			this.jsonElm.textContent = JSON.stringify(parsed, null, '\t');
			this.onEditCallBack(parsed);
		};
	}
}
