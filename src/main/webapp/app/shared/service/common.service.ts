import { Injectable } from '@angular/core';

@Injectable()
export class Common {
    constructor() { }
    inArray(obj, array, key?) {
        for (var i = 0; i < array.length; i++) {
            if (typeof key !== 'undefined') {
                if (array[i][key] === obj[key]) {
                    return i;
                }
            }
            else {
                if (array[i] === obj) {
                    return i;
                }
            }
        }
        return -1;
    }
    isEqual(x, y) {
        var in1 = x instanceof Object;
        var in2 = y instanceof Object;
        if (!in1 || !in2) {
            return x === y;
        }
        if (Object.keys(x).length !== Object.keys(y).length) {
            return false;
        }
        for (var p in x) {
            var a = x[p] instanceof Object;
            var b = y[p] instanceof Object;
            if (a && b) {
                return this.isEqual(x[p], y[p]);
            }
            else if (x[p] !== y[p]) {
                return false;
            }
        }
        return true;
    }
    getUrlParamByName(url, name) {
        var str = ';' + name + '=(.*)';
        var regExp = new RegExp(str);
        var regResult = url.match(regExp);
        if (regResult === null) {
            return '';
        }
        else {
            return regResult[1].split(';')[0];
        }
    }
    copy(source) {
        if (source !== null && typeof source === 'object') {
            if (source.constructor === Object) {
                let result = {};
                for (let key in source) {
                    result[key] = this.copy(source[key]);
                }
                return result;
            }
            else if (source.constructor === Array) {
                let result = [];
                source.forEach((item) => {
                    result.push(this.copy(item));
                });
                return result;
            }
        }
        else {
            return source;
        }
    }
}
