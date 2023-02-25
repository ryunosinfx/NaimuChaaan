import { R, REGEXs } from '../constants/ParseRule.js';
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
		const result = {};
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
			const STATUS = MangaNaimuParser.parseSateOfRow(row);
			let isStatusChange = false;
			const info = MangaNaimuParser.buildInfo(row);
			console.log('info STATUS:' + STATUS, info);
			if (STATUS !== R.STATUS.NONE) {
				const cmd = MangaNaimuParser.parseCommand(STATUS, info.main);
				if (STATUS === R.STATUS.TITLE) {
					cond.page = 0;
					cond.koma = 0;
					cond.fukidashi = 0;
					currentParents.cmd = cmd;
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
				cmd.comment = info.comment;

				for (const message of currentParents.ofanMessages) {
					cmd.messages.push(message);
				}
				Util.clear(currentParents.ofanMessages);
			} else if (currentParents.cmd) {
				currentParents.cmd.messages.push(row);
			}
			if (!isStatusChanged || !currentParents.cmd) {
				currentParents.ofanMessages.push(row);
				continue;
			}
		}
		if (currentParents.title) {
			result.title = currentParents.title;
		}
		return result;
	}
	static buildInfo(row) {
		const info = { main: row, comment: '' };
		if (REGEXs.formatComment.test(row)) {
			const tokens = row.split('&').join('&amp;').split('://').join('&#58;&#47;&#47;').split('//');
			info.main = tokens.shift();
			info.comment = tokens.join('//').split('&#58;&#47;&#47;').join('://').split('&amp;').join('&');
		}
		return info;
	}
	static parseCommand(status, cmdText) {
		const cmdLine = cmdText.split(' ').join('').split(/\t/).join('　').split(/\t/).join('');
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
		const match = cmdLine.match(REGEXs.formatTitle);
		const dataText = match[1];
		const tokens = dataText ? dataText.split('0') : [];
		return {
			pageStart:
				tokens.length > 0
					? tokens[0] === 'R'
						? R.PAGE_START.RIGHT
						: tokens[0] === 'T'
						? R.PAGE_START.TOP
						: R.PAGE_START.LEFT
					: R.PAGE_START.RIGHT,
			pageDirction:
				tokens.length > 1
					? tokens[1] === 'R' || tokens[1] === 'RL'
						? R.PAGENATION.RIGHT2LEFT
						: tokens[1] === 'T' || tokens[1] === 'TD'
						? R.PAGENATION.TOP2DOWN
						: R.PAGENATION.LEFT2LIGHT
					: R.PAGENATION.RIGHT2LEFT,
			pageSize: A4,
			marginY: 25,
			marginX: 5,
			messages: [],
			pages: [],
			images: [],
			page: null,
			koma: null,
			fukidashi: null,
			comment: null,
		};
	}
	static parseCmdLinePage() {
		return { messages: [], page: null, koma: null, fukidashi: null, comment: null, images: [], komas: [] };
	}
	static parseCmdLineKoma(cmdLine) {
		const match = cmdLine.match(REGEXs.formatKoma);
		const dataText = match[1];
		const tokens = dataText.split(':').join('').split(',');
		const result = {
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
			messages: [],
			fukidashis: [],
			images: [],
			page: null,
			koma: null,
			fukidashi: null,
			comment: null,
		}; //xNN,yNN,wNN,hNN,bNN,a,pN,lN,S
		console.log('cmdLine:', cmdLine);
		console.log('dataText:', dataText);
		console.log('tokens:', tokens);
		for (const token of tokens) {
			const intial = token ? token.split('')[0] : null;
			if (!token) {
				continue;
			}
			const value = token.substring(1);
			console.log('token:', token, intial, value);
			if (intial === R.KOMA.x) {
				result.x = Util.isNaN0(value);
			} else if (intial === R.KOMA.y) {
				result.y = Util.isNaN0(value);
			} else if (intial === R.KOMA.w) {
				result.width = Util.isNaN0(value);
			} else if (intial === R.KOMA.h) {
				result.hight = Util.isNaN0(value);
			} else if (intial === R.KOMA.b) {
				result.borderWidth = Util.isNaN0(value);
			} else if (intial === R.KOMA.p) {
				result.overPortlate =
					value === 'N'
						? R.OVER_PORTRATE.NONE
						: value === 'O'
						? R.OVER_PORTRATE.OVER
						: value === 'U'
						? R.OVER_PORTRATE.UNDER
						: value === 'B'
						? R.OVER_PORTRATE.BOTH
						: R.OVER_PORTRATE.NONE;
			} else if (intial === R.KOMA.l) {
				result.overLandscape =
					value === 'N'
						? R.OVER_LANDSCAPE.NONE
						: value === 'L'
						? R.OVER_LANDSCAPE.LEFT
						: value === 'R'
						? R.OVER_LANDSCAPE.RIGHT
						: value === 'B'
						? R.OVER_LANDSCAPE.BOTH
						: R.OVER_LANDSCAPE.NONE;
			} else if (intial === R.KOMA.s) {
				result.shape =
					value === 'R'
						? R.SHAPE.RECTANGLE
						: value === 'C'
						? R.SHAPE.CIRCLE
						: value === 'E'
						? R.SHAPE.ELIPSE
						: R.SHAPE.RECTANGLE;
			} else if (intial === R.KOMA.f) {
				result.frameStyle =
					value === 'S'
						? R.FRAME_STYLE.SOLID
						: value === 'D'
						? R.FRAME_STYLE.DOTTED
						: value === 'H'
						? R.FRAME_STYLE.HIDE
						: R.FRAME_STYLE.SOLID;
			} else if (intial === R.KOMA.a) {
				result.isAbsolute = true;
			}
		}
		if (result.isAbsolute && result.w === 0) {
			result.w = 10;
		}
		if (result.isAbsolute && result.h === 0) {
			result.h = 15;
		}
		return result;
	}
	static parseCmdLineFukidashi(cmdLine) {
		const match = cmdLine.match(REGEXs.formatFukidashi);
		const dataText = match[1];
		const tokens = dataText.split(':').join('').split(',');
		const result = {
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
			messages: [],
			images: [],
			page: null,
			koma: null,
			fukidashi: null,
			comment: null,
		}; //xNN,yNN,wNN,hNN,bNN,a,pN,lN,S
		for (const token of tokens) {
			const intial = token ? token.split('')[0] : null;
			if (!token) {
				continue;
			}
			const value = token.substring(1);
			if (intial === R.FUKIDASHI.x) {
				result.x = Util.isNaN0(value);
			} else if (intial === R.FUKIDASHI.y) {
				result.y = Util.isNaN0(value);
			} else if (intial === R.FUKIDASHI.w) {
				result.width = Util.isNaN0(value);
			} else if (intial === R.FUKIDASHI.h) {
				result.hight = Util.isNaN0(value);
			} else if (intial === R.FUKIDASHI.b) {
				result.borderWidth = Util.isNaN0(value);
			} else if (intial === R.FUKIDASHI.s) {
				result.shape =
					value === 'R'
						? R.SHAPE.RECTANGLE
						: value === 'C'
						? R.SHAPE.CIRCLE
						: value === 'E'
						? R.SHAPE.ELIPSE
						: R.SHAPE.RECTANGLE;
			} else if (intial === R.FUKIDASHI.f) {
				result.frameStyle =
					value === 'S'
						? R.FRAME_STYLE.SOLID
						: value === 'D'
						? R.FRAME_STYLE.DOTTED
						: value === 'H'
						? R.FRAME_STYLE.HIDE
						: R.FRAME_STYLE.SOLID;
			} else if (intial === R.FUKIDASHI.t) {
				result.tailInOut =
					value === 'O'
						? R.TAIL.OUTSIDE
						: value === 'I'
						? R.TAIL.INSIDE
						: value === 'N'
						? R.TAIL.NONE
						: R.TAIL.OUTSIDE;
			} else if (intial === R.FUKIDASHI.d) {
				result.isAbsolute = Util.isNaN0(value) % 360;
			} else if (intial === R.FUKIDASHI.a) {
				result.isAbsolute = true;
			} else if (intial === R.FUKIDASHI.u) {
				result.isUnion = true;
			}
		}
		if (result.isAbsolute && result.w === 0) {
			result.w = 10;
		}
		if (result.isAbsolute && result.h === 0) {
			result.h = 15;
		}
		return result;
	}
	static parseCmdLineFukidashiEnd() {
		return { messages: [], page: null, koma: null, fukidashi: null, comment: null };
	}
	static parseSateOfRow(row) {
		if (REGEXs.formatTitle.test(row)) {
			return R.STATUS.TITLE;
		}
		if (REGEXs.formatPage.test(row)) {
			return R.STATUS.PAGE;
		}
		if (REGEXs.formatKoma.test(row)) {
			return R.STATUS.KOMA;
		}
		if (REGEXs.formatFukidashi.test(row)) {
			return R.STATUS.FUKIDASHI;
		}
		if (REGEXs.formatFukidashiEnd.test(row)) {
			return R.STATUS.COMMENT;
		}
		return R.STATUS.NONE;
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
