import { R, REGEXs, INITIAL_MAP, NUMERIC, SINGLE, ATTR } from '../constants/ParseRule.js';
import { A4 } from '../constants/PaperSize.js';
import { Util } from './Util.js';
export class MangaNaimuParser {
	/**
	 *
	 * @param {string} text
	 */
	static parse(text = '') {
		const rows = text.split(REGEXs.CRLF);
		const cond = { page: 0, koma: 0, fukidashi: 0 };
		const result = { titles: [] };
		const currentParents = {
			title: null,
			page: null,
			koma: null,
			cmd: null,
			parent: null,
			ofanPages: [],
			ofanKomas: [],
			ofanFukidashis: [],
			ofanMessages: [],
		};
		let lastStatus = R.STATUS.NONE;
		let isStatusChanged = null;
		const len = rows.length;
		for (let i = 0; i < len; i++) {
			const row = rows[i];
			console.log('parse infoA row:', row);
			const STATUS = MangaNaimuParser.parseSateOfRow(row);
			let isStatusChange = false;
			const info = MangaNaimuParser.buildInfo(row);
			console.log('parse infoB STATUS:' + STATUS, info);
			if (STATUS !== R.STATUS.NONE) {
				const cmd = MangaNaimuParser.parseCommand(STATUS, info[ATTR.MAIN]);
				if (STATUS === R.STATUS.TITLE) {
					cond.page = 0;
					cond.koma = 0;
					cond.fukidashi = 0;
					if (
						currentParents.title &&
						(result.titles.length < 1 ||
							(result.titles.length > 0 &&
								result.titles[result.titles.length - 1] !== currentParents.title))
					) {
						result.titles.push(currentParents.title);
					}
					currentParents.cmd = cmd;
					currentParents.title = cmd;
					currentParents.title = cmd;
					for (const page of currentParents.ofanPages) {
						cmd.pages.push(page);
					}
					Util.clear(currentParents.ofanPages);
				} else if (STATUS === R.STATUS.PAGE) {
					cond.page++;
					cond.koma = 0;
					cond.fukidashi = 0;
					currentParents.cmd = cmd;
					currentParents.page = cmd;
					currentParents.parent = currentParents.title;
					if (!currentParents.title) {
						currentParents.ofanPages.push(cmd);
					} else {
						currentParents.title.pages.push(cmd);
					}
					for (const koma of currentParents.ofanKomas) {
						cmd.komas.push(koma);
					}
					Util.clear(currentParents.ofanKomas);
				} else if (STATUS === R.STATUS.KOMA) {
					cond.koma++;
					cond.fukidashi = 0;
					currentParents.cmd = cmd;
					currentParents.parent = currentParents.page;
					currentParents.koma = cmd;
					if (!currentParents.page) {
						currentParents.ofanKomas.push(cmd);
					} else {
						currentParents.page.komas.push(cmd);
					}
					for (const fukidashi of currentParents.ofanFukidashis) {
						cmd.fukidashis.push(fukidashi);
					}
					Util.clear(currentParents.ofanFukidashis);
				} else if (STATUS === R.STATUS.FUKIDASHI) {
					cond.fukidashi++;
					currentParents.cmd = cmd;
					currentParents.parent = currentParents.koma;
					if (!currentParents.koma) {
						currentParents.ofanFukidashis.push(cmd);
					} else {
						currentParents.koma.fukidashis.push(cmd);
					}
				} else if (STATUS === R.STATUS.FUKIDASHIend) {
					lastStatus = R.STATUS.KOMA;
				}
				isStatusChange = true;
				isStatusChanged = true;
				lastStatus = STATUS;
				info.status = lastStatus;
				cmd.page = cond.page;
				cmd.koma = cond.koma;
				cmd.fukidashi = cond.fukidashi;
				cmd.comment = info[ATTR.COMMENT];

				for (const message of currentParents.ofanMessages) {
					cmd[ATTR.MESSAGES].push(message);
				}
				Util.clear(currentParents.ofanMessages);
			} else if (currentParents.cmd) {
				currentParents.cmd[ATTR.MESSAGES].push(info);
			}
			if (!isStatusChanged || !currentParents.cmd) {
				currentParents.ofanMessages.push(info);
				continue;
			}
		}
		if (
			currentParents.title &&
			(result.titles.length < 1 ||
				(result.titles.length > 0 && result.titles[result.titles.length - 1] !== currentParents.title))
		) {
			result.titles.push(currentParents.title);
		}
		return result;
	}
	static buildInfo(row) {
		const info = {};
		info[ATTR.MAIN] = row;
		info[ATTR.COMMENT] = '';
		if (REGEXs.comment.test(row)) {
			const tokens = row.split('&').join('&amp;').split('://').join('&#58;&#47;&#47;').split('//');
			info[ATTR.MAIN] = tokens.shift();
			info[ATTR.COMMENT] = tokens.join('//').split('&#58;&#47;&#47;').join('://').split('&amp;').join('&');
		}
		return info;
	}
	static parseCommand(status, cmdText) {
		const cmdLine = cmdText.split(' ').join('').split(/\t/).join('　').split(/\t/).join('');
		console.log('parseCommand cmdLine:' + cmdLine, cmdText);
		if (status === R.STATUS.TITLE) {
			return MangaNaimuParser.parseCmdLineTitle(cmdLine);
		}
		if (status === R.STATUS.PAGE) {
			return MangaNaimuParser.parseCmdLinePage(cmdLine);
		}
		if (status === R.STATUS.KOMA) {
			return MangaNaimuParser.parseCmdLineKoma(cmdLine);
		}
		if (status === R.STATUS.FUKIDASHI) {
			return MangaNaimuParser.parseCmdLineFukidashi(cmdLine);
		}
		if (status === R.STATUS.FUKIDASHIend) {
			return MangaNaimuParser.parseCmdLineFukidashiEnd(cmdLine);
		}
	}
	static parseCmdLineTitle(cmdLine) {
		console.log('parseCmdLineTitle cmdLine:' + cmdLine);
		const obj = {
			pageStart: R.PAGE_START.RIGHT,
			pageDirction: R.PAGENATION.RIGHT2LEFT,
			pageSize: A4,
			marginY: 25,
			marginX: 5,
			pages: [],
			images: [],
			page: null,
			koma: null,
			fukidashi: null,
		};
		obj[ATTR.MESSAGES] = [];
		obj[ATTR.COMMENT] = null;
		MangaNaimuParser.addObjValue('title', obj, cmdLine);
		return obj;
	}
	static addObjValue(level, obj = {}, cmdLine = '') {
		console.log(`addObjValue level:${level} cmdLine:`, cmdLine);
		const match = cmdLine.match(REGEXs[level]);
		if (!match) {
			return;
		}
		const dataText = match[1];
		const tokens = dataText ? dataText.split(',') : [];
		console.log(`addObjValue level:${level} dataText:`, dataText);
		console.log(`addObjValue level:${level} tokens:`, tokens);
		const m = INITIAL_MAP[level];
		const names = INITIAL_MAP[`${level}_names`];
		console.log(`addObjValue level:${level} m:`, m);
		console.log(`addObjValue level:${level} names:`, names);
		for (const token of tokens) {
			console.log(`addObjValue level:${level} token:`, token);
			const initial = MangaNaimuParser.getInitial(token);
			console.log(`addObjValue level:${level} initial:`, initial);
			if (!token) {
				continue;
			}
			const value = MangaNaimuParser.getValue(token);
			console.log(`addObjValue level:${level} value:`, value);
			const v = m[initial];
			const name = names[initial];
			if (v) {
				if (Array.isArray(v)) {
					for (const r of v) {
						const a = r[value];
						if (a !== undefined) {
							obj[name] = a;
							break;
						}
					}
				} else if (v === NUMERIC) {
					obj[name] = Util.isNaN0(value);
				} else if (v === SINGLE) {
					obj[name] = true;
				}
			}
		}
	}
	static parseCmdLinePage(cmdLine) {
		console.log('parseCmdLinePage cmdLine:' + cmdLine);
		const obj = { page: null, koma: null, fukidashi: null, images: [], komas: [] };
		obj[ATTR.MESSAGES] = [];
		obj[ATTR.COMMENT] = null;
		MangaNaimuParser.addObjValue('page', obj, cmdLine);
		return obj;
	}
	static parseCmdLineKoma(cmdLine) {
		const obj = {
			x: 0,
			y: 0,
			hight: 0,
			width: 0,
			borderWidth: 2,
			isAbsolute: false,
			frameStyle: R.FRAME_STYLE.SOLID,
			overPortlate: R.OVER_PORTRATE.NONE,
			overLandscape: R.OVER_LANDSCAPE.NONE,
			shape: R.SHAPE.RECTANGLE,
			fukidashis: [],
			images: [],
			page: null,
			koma: null,
			fukidashi: null,
		}; //xNN,yNN,wNN,hNN,bNN,a,pN,lN,S
		obj[ATTR.MESSAGES] = [];
		obj[ATTR.COMMENT] = null;
		MangaNaimuParser.addObjValue('koma', obj, cmdLine);
		return obj;
	}
	static parseCmdLineFukidashi(cmdLine) {
		const obj = {
			x: 0,
			y: 0,
			hight: 0,
			width: 0,
			borderWidth: 1,
			isAbsolute: false,
			frameStyle: R.FRAME_STYLE.SOLID,
			shape: R.SHAPE.RECTANGLE,
			direction: 0,
			isUnion: false,
			tailInOut: R.TAIL.OUTSIDE,
			images: [],
			page: null,
			koma: null,
			fukidashi: null,
		}; //xNN,yNN,wNN,hNN,bNN,a,pN,lN,S
		obj[ATTR.MESSAGES] = [];
		obj[ATTR.COMMENT] = null;
		MangaNaimuParser.addObjValue('fukidashi', obj, cmdLine);
		return obj;
	}
	static parseCmdLineFukidashiEnd() {
		const obj = { page: null, koma: null, fukidashi: null };
		obj[ATTR.MESSAGES] = [];
		obj[ATTR.COMMENT] = null;
		return obj;
	}
	static parseSateOfRow(row) {
		if (REGEXs.title.test(row)) {
			return R.STATUS.TITLE;
		}
		if (REGEXs.page.test(row)) {
			return R.STATUS.PAGE;
		}
		if (REGEXs.koma.test(row)) {
			return R.STATUS.KOMA;
		}
		if (REGEXs.fukidashi.test(row)) {
			return R.STATUS.FUKIDASHI;
		}
		if (REGEXs.fukidashiEnd.test(row)) {
			return R.STATUS.COMMENT;
		}
		return R.STATUS.NONE;
	}
	static getInitial(token) {
		return token ? (token.indexOf(':') > 0 ? token.split(':')[0] : token.split('')[0]) : null;
	}
	static getValue(token) {
		return token ? (token.indexOf(':') > 0 ? token.split(':')[1] : token.substring(1)) : null;
	}
}
/**
 * ・改行で区切って
・各行に記法の記載がないか
・必要な記法は
①作品設定####T# R0LRTD
②頁#### P
③コマ####K# xNN,yNN,wNN,hNN,bNN,a,pN,lN,S
④吹き出し・モノローグ####F#xNN,yNN,wNN,hNN,bNN,a,pN,lN,S
#### で終了
⑤描写※記法なし
⑥コメント//
 */
