export class Util {
	static isNaN0(str = '', defaultValue = 0) {
		const i = str * 1;
		return isNaN(i) ? defaultValue : i;
	}
	static merge(obj1 = {}, obj2 = {}) {
		const keys = Object.keys(obj2);
		for (const key of keys) {
			obj1[key] = obj2[key];
		}
	}
	static clear(obj) {
		if (obj && typeof obj === 'object') {
			if (Array.isArray(obj)) {
				obj.splice(0, obj.length);
			} else {
				const keys = Object.keys(obj);
				for (const key of keys) {
					delete obj[key];
				}
				keys.splice(0, keys.length);
			}
		}
	}
}
