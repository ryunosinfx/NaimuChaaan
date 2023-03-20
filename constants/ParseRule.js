export const R = {
	STATUS: { TITLE: 1, PAGE: 2, KOMA: 4, FUKIDASHI: 8, FUKIDASHIend: 32, COMMENT: 16, NONE: 0 },
	PAGE_START: { RIGHT: 0, LEFT: 1, TOP: 2 },
	PAGE_START_S: { R: 0, L: 1, T: 2 },
	PAGENATION: { RIGHT2LEFT: 0, LEFT2RIGHT: 1, TOP2DOWN: 2 },
	PAGENATION_S: { RL: 0, LR: 1, TD: 2 },
	OVER_PORTRATE: { NONE: 0, OVER: 1, UNDER: 2, BOTH: 4 },
	OVER_PORTRATE_S: { N: 0, O: 1, U: 2, B: 4 },
	OVER_LANDSCAPE: { NONE: 0, RIGHT: 1, LEFT: 2, BOTH: 4 },
	OVER_LANDSCAPE_S: { N: 0, R: 1, L: 2, B: 4 },
	SHAPE: { RECTANGLE: 0, CIRCLE: 1, ELIPSE: 2 },
	SHAPE_S: { R: 0, C: 1, E: 2 },
	FRAME_STYLE: { SOLID: 0, DOTTED: 1, HIDE: 2, DASHED: 4, DOUBLE: 8 },
	FRAME_STYLE_S: { S: 0, D: 1, H: 2, A: 4, O: 8 },
	TAIL: { OUTSIDE: 0, INSIDE: 1, NONE: 2 },
	TAIL_S: { O: 0, I: 1, N: 2 },
	KOMA: {
		x: 'x', //x
		y: 'y', //y
		w: 'w', //width
		h: 'h', //height
		a: 'a', //isAbsolute
		p: 'p', //orverPortrate N:none,O:orver,U:under,B:both
		l: 'l', //overLandscape N:none,R:right,L:left,B:both
		s: 's', //Shape R:rectangle,C:circle,E:elipse
		b: 'b', //borderWidth
		f: 'f', //frameStyle S:solit,D:dottet,H:hide
	},
	FUKIDASHI: {
		x: 'x', //x
		y: 'y', //y
		w: 'w', //width
		h: 'h', //height
		a: 'a', //isAbsolute
		s: 's', //Shape R:rectangle,C:circle,E:elipse
		b: 'b', //borderWidth
		f: 'f', //frameStyle S:solit,D:dottet,H:hide
		d: 'd', //direction
		u: 'u', //isUnion
		t: 't', //tailInOut
	},
};
export const RR = new Map();

export const NUMERIC = 'NUMERIC';
export const SINGLE = 'SINGLE';
export const ATTR = {
	COMMENT: 'comment',
	MAIN: 'main',
	MESSAGES: 'messages',
	CMT: ' // ',
};

const title = {
	s: [R.PAGE_START, R.PAGE_START_S],
	page_start: [R.PAGE_START, R.PAGE_START_S],
	pageStart: [R.PAGE_START, R.PAGE_START_S],
	d: [R.PAGENATION, R.PAGENATION_S],
	direction: [R.PAGENATION, R.PAGENATION_S],
	pageDirction: [R.PAGENATION, R.PAGENATION_S],
	pagenation: [R.PAGENATION, R.PAGENATION_S],
};
const title_key = { pageStart: 'pageStart', pageDirction: 'pageDirction' };
const title_names = {
	s: title_key.pageStart,
	page_start: title_key.pageStart,
	pageStart: title_key.pageStart,
	d: title_key.pageDirction,
	direction: title_key.pageDirction,
	pagenation: title_key.pageDirction,
	pageDirction: title_key.pageDirction,
};
const page = {};
const page_key = {};
const page_names = {};
const koma = {
	x: NUMERIC,
	y: NUMERIC,
	w: NUMERIC,
	h: NUMERIC,
	width: NUMERIC,
	height: NUMERIC,
	a: SINGLE,
	absolute: SINGLE,
	isAbsolute: SINGLE,
	s: [R.SHAPE, R.SHAPE_S],
	shape: [R.SHAPE, R.SHAPE_S],
	p: [R.OVER_PORTRATE, R.OVER_PORTRATE_S],
	over_portrate: [R.OVER_PORTRATE, R.OVER_PORTRATE_S],
	overPortrate: [R.OVER_PORTRATE, R.OVER_PORTRATE_S],
	l: [R.OVER_LANDSCAPE, R.OVER_LANDSCAPE_S],
	over_landscape: [R.OVER_LANDSCAPE, R.OVER_LANDSCAPE_S],
	overLandscape: [R.OVER_LANDSCAPE, R.OVER_LANDSCAPE_S],
	b: NUMERIC,
	border_width: NUMERIC,
	borderWidth: NUMERIC,
	f: [R.FRAME_STYLE, R.FRAME_STYLE_S],
	frame_style: [R.FRAME_STYLE, R.FRAME_STYLE_S],
	frameStyle: [R.FRAME_STYLE, R.FRAME_STYLE_S],
	u: SINGLE,
	union: SINGLE,
	isUnion: SINGLE,
};
const koma_key = {
	x: 'x',
	y: 'y',
	width: 'width',
	height: 'height',
	isAbsolute: 'isAbsolute',
	shape: 'shape',
	overPortrate: 'overPortrate',
	overLandscape: 'overLandscape',
	borderWidth: 'borderWidth',
	frameStyle: 'frameStyle',
	isUnion: 'isUnion',
};
const koma_names = {
	x: koma_key.x,
	y: koma_key.y,
	w: koma_key.width,
	h: koma_key.height,
	width: koma_key.width,
	height: koma_key.height,
	a: koma_key.isAbsolute,
	absolute: koma_key.isAbsolute,
	isAbsolute: koma_key.isAbsolute,
	s: koma_key.shape,
	shape: koma_key.shape,
	p: koma_key.overPortrate,
	over_portrate: koma_key.overPortrate,
	overPortrate: koma_key.overPortrate,
	l: koma_key.overLandscape,
	over_landscape: koma_key.overLandscape,
	overLandscape: koma_key.overLandscape,
	b: koma_key.borderWidth,
	border_width: koma_key.borderWidth,
	borderWidth: koma_key.borderWidth,
	f: koma_key.frameStyle,
	frame_style: koma_key.frameStyle,
	frameStyle: koma_key.frameStyle,
	u: koma_key.isUnion,
	union: koma_key.isUnion,
	isUnion: koma_key.isUnion,
};
const fukidashi = {
	x: NUMERIC,
	y: NUMERIC,
	w: NUMERIC,
	h: NUMERIC,
	width: NUMERIC,
	height: NUMERIC,
	a: SINGLE,
	absolute: SINGLE,
	isAbsolute: SINGLE,
	s: [R.SHAPE, R.SHAPE_S],
	shape: [R.SHAPE, R.SHAPE_S],
	b: NUMERIC,
	border_width: NUMERIC,
	borderWidth: NUMERIC,
	f: [R.FRAME_STYLE, R.FRAME_STYLE_S],
	frame_style: [R.FRAME_STYLE, R.FRAME_STYLE_S],
	frameStyle: [R.FRAME_STYLE, R.FRAME_STYLE_S],
	u: SINGLE,
	union: SINGLE,
	isUnion: SINGLE,
	t: [R.TAIL, R.TAIL_S],
	tail: [R.TAIL, R.TAIL_S],
};
const fukidashi_key = {
	x: 'x',
	y: 'y',
	width: 'width',
	height: 'height',
	isAbsolute: 'isAbsolute',
	shape: 'shape',
	tail: 'tail',
	borderWidth: 'borderWidth',
	frameStyle: 'frameStyle',
	isUnion: 'isUnion',
};
const fukidashi_names = {
	x: fukidashi_key.x,
	y: fukidashi_key.y,
	w: fukidashi_key.width,
	h: fukidashi_key.height,
	width: fukidashi_key.width,
	height: fukidashi_key.height,
	a: fukidashi_key.isAbsolute,
	absolute: fukidashi_key.isAbsolute,
	isAbsolute: fukidashi_key.isAbsolute,
	s: fukidashi_key.shape,
	shape: fukidashi_key.shape,
	b: fukidashi_key.borderWidth,
	border_width: fukidashi_key.borderWidth,
	borderWidth: fukidashi_key.borderWidth,
	f: fukidashi_key.frameStyle,
	frame_style: fukidashi_key.frameStyle,
	frameStyle: fukidashi_key.frameStyle,
	u: fukidashi_key.isUnion,
	union: fukidashi_key.isUnion,
	isUnion: fukidashi_key.isUnion,
	t: fukidashi_key.tail,
	tail: fukidashi_key.tail,
};
export const INITIAL_MAP = {
	title,
	page,
	koma,
	fukidashi,
	title_names,
	page_names,
	koma_names,
	fukidashi_names,
	title_key,
	page_key,
	koma_key,
	fukidashi_key,
};
export const ReverseLookUpMap = {
	PAGE_START: {},
	PAGENATION: {},
	OVER_PORTRATE: {},
	OVER_LANDSCAPE: {},
	SHAPE: {},
	FRAME_STYLE: {},
	TAIL: {},
	KOMA: {},
	FUKIDASHI: {},
};
export const ReverseLookUpMap_DEFAULT_MAP = {};
export const LEVELS = ['title', 'page', 'koma', 'fukidashi'];
export const LEVEL_PROPS = {
	title: { PAGE_START: '', PAGE_START_S: '', PAGENATION: '0', PAGENATION_S: '0' },
	page: {},
	koma: {
		OVER_PORTRATE: '',
		OVER_PORTRATE_S: '',
		OVER_LANDSCAPE: '',
		OVER_LANDSCAPE_S: '',
		SHAPE: '',
		SHAPE_S: '',
		FRAME_STYLE: '',
		FRAME_STYLE_S: '',
	},
	fukidashi: { SHAPE: '', SHAPE_S: '', FRAME_STYLE: '', FRAME_STYLE_S: '', TAIL: '', TAIL_S: '' },
};
function build() {
	for (const r in R) {
		const obj = R[r];
		RR.set(obj, r);
	}
	for (const key in R.PAGE_START) {
		const value = R.PAGE_START[key];
		ReverseLookUpMap.PAGE_START[value] = key;
	}
	for (const key in R.PAGENATION_S) {
		const value = R.PAGENATION_S[key];
		ReverseLookUpMap.PAGENATION[value] = key;
	}
	for (const key in R.OVER_PORTRATE_S) {
		const value = R.OVER_PORTRATE_S[key];
		ReverseLookUpMap.OVER_PORTRATE[value] = key;
	}
	for (const key in R.OVER_LANDSCAPE_S) {
		const value = R.OVER_LANDSCAPE_S[key];
		ReverseLookUpMap.OVER_LANDSCAPE[value] = key;
	}
	for (const key in R.SHAPE_S) {
		const value = R.SHAPE_S[key];
		ReverseLookUpMap.SHAPE[value] = key;
	}
	for (const key in R.FRAME_STYLE_S) {
		const value = R.FRAME_STYLE_S[key];
		ReverseLookUpMap.FRAME_STYLE[value] = key;
	}
	for (const key in R.TAIL_S) {
		const value = R.TAIL_S[key];
		ReverseLookUpMap.TAIL[value] = key;
	}
	for (const key in ReverseLookUpMap) {
		const map = ReverseLookUpMap[key];
		for (const mkey in map) {
			ReverseLookUpMap_DEFAULT_MAP[key] = mkey;
			break;
		}
	}
}
build();
export const D = {
	defaultTitle: { text: '####T# sL,dRL\n' },
	defaultPage: { text: '  #####P#\n' },
	defaultKoma: { text: '      #####K# x:0,y:0' },
	defaultFukidashi: { text: '         #####F# x:0,y:0' },
	defaultFukidashiEnd: { text: '######' },
};
export const Header = {
	title: '####T#',
	page: '#####P#',
	koma: '#####K#',
	fukidashi: '#####F#',
	fukidashiEnd: '######',
};

export const REGEXs = {
	CRLF: /\r\n|\r|\n/,
	title: /[\t\s　]*####T#[ ]*([-_:0-9,a-zA-Z]+)/,
	page: /[\t\s　]*#####P#/,
	koma: /[\t\s　]*#####K#[ ]*([-_:0-9,a-zA-Z]+)/,
	fukidashi: /[\t\s　]*#####F#[ ]*([-_:0-9,a-zA-Z]+)/,
	fukidashiEnd: /[\t\s　]*######/,
	comment: /[^:]*\/\//,
};
