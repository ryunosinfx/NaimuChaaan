import {
	RR,
	ReverseLookUpMap,
	ReverseLookUpMap_DEFAULT_MAP,
	LEVEL_PROPS,
	Header,
	LEVELS,
	INITIAL_MAP,
	NUMERIC,
	SINGLE,
	ATTR,
} from '../constants/ParseRule.js';
import { A4 } from '../constants/PaperSize.js';
import { Util } from './Util.js';
export class MangaNaimuStringifyer {
	static SPACE = ' ';
	static COMMA = ',';
	static COLON = ':';
	static ignoreKeys = [];
	static vals = [];
	/**
	 *
	 * @param {*} obj
	 * @param {*} lines
	 * @param {*} target
	 */
	static stringify(obj, lines = [], target = LEVELS[0]) {
		for (const key in obj) {
			if (key !== target + 's') {
				continue;
			}
			console.log(`stringify target:${target} obj:`, obj);
			const currents = obj[target + 's'];
			for (const current of currents) {
				MangaNaimuStringifyer.stringifyExe(current, lines, target);
			}
		}
	}

	static stringifyExe(current, lines, target) {
		const index = LEVELS.indexOf(target);
		const indemt = '\t'.repeat(index);
		const head = Header[target];
		const rowSeed = [indemt, head, MangaNaimuStringifyer.SPACE];
		const types = INITIAL_MAP[target];
		const keys = INITIAL_MAP[target + '_key'];
		const propMap = LEVEL_PROPS[target];
		console.log(`stringify head:${head} propMap:`, propMap);
		for (const key in keys) {
			console.log(`stringify key:${key} types:`, types);
			const value = current[key];
			const type = types[key];
			console.log(`stringify type:${type} value:`, value);
			if (value !== undefined) {
				console.log(`stringify value:${value} type:`, type);
				if (Array.isArray(type)) {
					for (const t of type) {
						const tt = RR.get(t);
						console.log(`stringify t:${t} tt:`, tt);
						const lookupMap = ReverseLookUpMap[tt];
						console.log(
							`stringify propMap[tt]:${propMap[tt]} ReverseLookUpMap_DEFAULT_MAP[tt]:${
								ReverseLookUpMap_DEFAULT_MAP[tt]
							} / value:${value} /${ReverseLookUpMap_DEFAULT_MAP[tt] === value + ''}lookupMap:`,
							lookupMap
						);
						if (propMap[tt] !== undefined && lookupMap && ReverseLookUpMap_DEFAULT_MAP[tt] !== value + '') {
							const label = lookupMap[value];
							if (ReverseLookUpMap_DEFAULT_MAP[tt] !== value) {
								MangaNaimuStringifyer.vals.push(` ${key}:${label}`);
							}
							break;
						}
					}
				} else if (type === NUMERIC) {
					MangaNaimuStringifyer.vals.push(` ${key}:${value}`);
				} else if (type === SINGLE) {
					if (value === true) MangaNaimuStringifyer.vals.push(`${key}`);
				}
			}
		}
		rowSeed.push(MangaNaimuStringifyer.vals.join(MangaNaimuStringifyer.COMMA));
		Util.clear(MangaNaimuStringifyer.vals);
		const comment = current[ATTR.COMMENT];
		const messages = current[ATTR.MESSAGES];
		if (comment) {
			rowSeed.push(ATTR.CMT + comment);
		}
		lines.push(rowSeed.join(''));
		if (Array.isArray(messages)) {
			const indemt = '\t'.repeat(index + 1);
			for (const msg of messages) {
				if (msg && typeof msg === 'object') {
					const main = msg[ATTR.MAIN];
					const cmt = msg[ATTR.COMMENT];
					lines.push(indemt + main + (cmt ? ATTR.CMT + cmt : ''));
				}
			}
		}
		const next = LEVELS.length > index ? LEVELS[index + 1] : null;
		console.log(`stringify target:${target} next:`, next);
		if (next) MangaNaimuStringifyer.stringify(current, lines, next);
		if (target === LEVELS[LEVELS.length - 1]) {
			lines.push(indemt + Header[target + 'End']);
		}
	}
}
/**
{
	"title": {
		"pageStart": 1,
		"pageDirction": 0,
		"pageSize": {
			"FRAME": {
				"w": 210,
				"h": 297
			},
			"PAGE": {
				"w": 182,
				"h": 257
			},
			"INNER": {
				"w": 150,
				"h": 220
			}
		},
		"marginY": 25,
		"marginX": 5,
		"messages": [
			{
				"main": "",
				"comment": ""
			},
			{
				"main": "あだｓだｓｄ",
				"comment": ""
			},
			{
				"main": "あｓだｓｄ",
				"comment": "/asadasdasd"
			},
			{
				"main": "      ",
				"comment": ""
			}
		],
		"pages": [
			{
				"messages": [],
				"page": 1,
				"koma": 0,
				"fukidashi": 0,
				"comment": "",
				"images": [],
				"komas": [
					{
						"x": 0,
						"y": 0,
						"hight": 0,
						"width": 0,
						"borderWidth": 2,
						"isAbsolute": false,
						"frameStyle": 0,
						"overPortlate": 0,
						"overLandscape": 0,
						"shape": 0,
						"messages": [
							{
								"main": "",
								"comment": ""
							}
						],
						"fukidashis": [],
						"images": [],
						"page": 1,
						"koma": 1,
						"fukidashi": 0,
						"comment": ""
					}
				]
			}
		],
		"images": [],
		"page": 0,
		"koma": 0,
		"fukidashi": 0,
		"comment": ""
	}
}
 */
