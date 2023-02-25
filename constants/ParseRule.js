export const R = {
	STATUS: { TITLE: 1, PAGE: 2, KOMA: 4, FUKIDASHI: 8, FUKIDASHIend: 32, COMMENT: 16, NONE: 0 },
	PAGE_START: { RIGHT: 0, LEFT: 1, TOP: 2 },
	PAGENATION: { RIGHT2LEFT: 0, LEFT2LIGHT: 1, TOP2DOWN: 2 },
	OVER_PORTRATE: { NONE: 0, OVER: 1, UNDER: 2, BOTH: 4 },
	OVER_LANDSCAPE: { NONE: 0, RIGHT: 1, LEFT: 2, BOTH: 4 },
	SHAPE: { RECTANGLE: 0, CIRCLE: 1, ELIPSE: 2 },
	FRAME_STYLE: { SOLID: 0, DOTTED: 1, HIDE: 2, DASHED: 4, DOUBLE: 8 },
	TAIL: { OUTSIDE: 0, INSIDE: 1, NONE: 2 },
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
export const D = {
	defaultTitle: { text: '####T# L0RL\n' },
	defaultPage: { text: '  #####P#\n' },
	defaultKoma: { text: '      #####K# x:0,y:0' },
	defaultFukidashi: { text: '         #####F# x:0,y:0' },
	defaultFukidashiEnd: { text: '######' },
};

export const REGEXs = {
	CRLF: /\r\n|\r|\n/,
	formatTitle: /[\t\s　]*####T#[ ]*([RLT]0[RLTD]{1,2})/,
	formatPage: /[\t\s　]*#####P#/,
	formatKoma: /[\t\s　]*#####K#[ ]*([- :0-9,xywhabplsfEHUOCRLBNSD]+)/,
	formatFukidashi: /[\t\s　]*#####F#[ ]*([- :0-9,xywhabsfudtEIOCRLBHNSD]+)/,
	formatFukidashiEnd: /[\t\s　]*######/,
	formatComment: /[^:]*\/\//,
};
