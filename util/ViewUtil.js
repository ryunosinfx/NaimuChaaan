const o = { v: null };
export class ViewUtil {
	static gi(dels = []) {
		if (!o.v) {
			o.v = new ViewUtil();
		}
		for (let del of dels) {
			o.v.r(del);
		}
		return o.v;
	}
	constructor() {
		const d = document;
		this.d = d;
		this.w = window;
		this.x = this.tn('html');
		this.b = this.tn('body');
		this.h = this.tn('head');
	}
	/**
	 * Creat Elm
	 * @param {*} tag
	 * @returns
	 */
	c(tag, id, className, text) {
		const elm = this.d.createElement(tag);
		elm.setAttribute('id', id);
		this.addClass(elm, className);
		elm.textContent = text;
		return elm;
	}
	addClass(elm, className) {
		elm.classList.add(className);
	}
	removeClass(elm, className) {
		elm.classList.remove(className);
	}
	/**
	 * appendChild
	 * @param {*} parent
	 * @param {*} elm
	 * @returns
	 */
	append(parent, elm) {
		return parent.appendChild(elm);
	}
	/**
	 * appendChild to body
	 * @param {*} e
	 */
	append2Body(e) {
		this.append(this.b, e);
	}
	/**
	 * click
	 * @param {*} elm
	 * @param {*} eventName
	 * @param {*} callback
	 * @returns
	 */
	onClick(elm, callback) {
		this.ael(elm, 'click', callback);
	}
	/**
	 * click
	 * @param {*} elm
	 * @param {*} eventName
	 * @param {*} callback
	 * @returns
	 */
	onChange(elm, callback) {
		this.ael(elm, 'change', callback);
	}
	/**
	 * addEventListener
	 * @param {*} elm
	 * @param {*} eventName
	 * @param {*} callback
	 * @returns
	 */
	ael(elm, eventName, callback) {
		if (typeof elm === 'string') {
			const el = this.gid(elm);
			el.addEventListener(eventName, callback);
			return;
		}
		elm.addEventListener(eventName, callback);
	}
	/**
	 * getElementById
	 * @param {*} id
	 * @returns
	 */
	gid(id) {
		return this.d.getElementById(id);
	}
	/**
	 * Create Element With Text & ClassName
	 * @param {*} tag
	 * @param {*} text
	 * @param {*} className
	 * @returns
	 */
	ct(tag, text, className) {
		const elm = this.c(tag);
		elm.textContent = text;
		elm.className = className ? className : '';
		return elm;
	}
	/**
	 * remove all by tagName
	 * @param {*} tag
	 * @returns
	 */
	rat(tag) {
		const es = this.tn(tag);
		if (!Array.isArray(es)) {
			return es;
		}
		for (const e of es) {
			this.r(e);
		}
	}
	/**
	 * removeChiled
	 * @param {*} e
	 */
	rc(e) {
		for (const c of e.children) {
			e.removeChild(c);
		}
	}
	/**
	 * removeAll
	 * @param {*} e
	 */
	r(e) {
		const p = e.parent ? e.parent : this.d;
		for (const c of e.children) {
			this.r(c);
			e.removeChild(c);
		}
		if (e.parent) {
			p.removeChild(e);
		} else {
			e.remove();
		}
	}
	tn(tag) {
		return this.d.getElementsByTagName(tag)[0];
	}
	div(id, className) {
		return this.c('div', id, className);
	}
	span(id, className, text) {
		return this.c('span', id, className, text);
	}
	canvas(id, className) {
		return this.c('canvas', id, className);
	}
	textarea(id, className) {
		return this.c('textarea', id, className);
	}
	input(id, className) {
		return this.c('input', id, className);
	}
	button(id, className, text) {
		return this.c('button', id, className, text);
	}
	setStyle(elm, styles = {}) {
		for (const key in styles) {
			elm.style[key] = styles[key];
		}
	}
	getComputedStyle(elm) {
		return window.getComputedStyle(elm, null);
	}
}
export const V = ViewUtil.gi();
