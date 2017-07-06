import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Common } from './common.service';

@Injectable()
export class Ajax {

    constructor(
        private http: Http,
        private common: Common
    ) { }

    /**
     * get
     * @param [url] 请求路径
     * @param [params] 请求参数，没有可以传null
     * @param [url] 缓存时间，不传或者传false表示不缓存，传数字表示缓存的时间（毫秒值）
     */
    public get(url: string, params?: object, cache?: boolean | number): Promise<any> {
        return this.doRequest(url, params, 'get', cache || false);
    }

    /**
     * post
     * @param [url] 请求路径
     * @param [params] 请求参数，没有可以传null
     * @param [url] 缓存时间，不传或者传false表示不缓存，传数字表示缓存的时间（毫秒值）
     */
    public post(url: string, params?: object, cache?: boolean | number): Promise<any> {
        return this.doRequest(url, params, 'post', cache || false);
    }

    /**
     * request payload
     * @param [url] 请求路径
     * @param [params] 请求参数，没有可以传null
     * @param [url] 缓存时间，不传或者传false表示不缓存，传数字表示缓存的时间（毫秒值）
     */
    public postByJson(url: string, params?: object, cache?: boolean | number): Promise<any> {
        return this.doRequest(url, params, 'json', cache || false);
    }

    //ajax缓存
    private ajaxCache: Map<string, any> = new Map<string, any>();

    //ajax缓存时间，默认10分钟
    private ajaxCacheTime: number = 1000 * 60 * 10;

    private isCacheExpired(cacheObj, time) {
        return Date.now() - cacheObj.timestamp <= time ? false : true;
    }

    private getCache(url, params, cache) {
        if (cache) {
            var cacheArr = this.ajaxCache.get(url);
            if (cacheArr) {
                var time = typeof cache === 'number' ? cache : this.ajaxCacheTime;
                for (let i = 0; i < cacheArr.length; i++) {
                    var cacheObj = cacheArr[i];
                    if (this.isCacheExpired(cacheObj, time)) {
                        cacheArr.splice(i, 1);
                        --i;
                        continue;
                    }
                    if (this.common.isEqual(params, cacheObj.params)) {
                        return cacheObj;
                    }
                }
                return null;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }

    private doRequest(url: string, params: object, type: string, cache: boolean | number) {
        return new Promise((resolve, reject) => {
            var cacheObj = this.getCache(url, params, cache);
            if (cacheObj !== null) {
                resolve(this.common.copy(cacheObj.data));
            }
            else {
                let o: any;
                if (type === 'get') {
                    o = this.http.get(url, new RequestOptions({
                        params: params,
                        headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
                    }))
                }
                else if (type === 'post') {
                    let body = new URLSearchParams();
                    for (let p in (params as any)) {
                        if (params.hasOwnProperty(p)) {
                            body.set(p, params[p]);
                        }
                    }
                    o = this.http.post(url, body, new RequestOptions({
                        headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })
                    }))
                }
                else {
                    let body = params;
                    o = this.http.post(url, body, new RequestOptions({
                        headers: new Headers({ 'Content-Type': 'application/json; charset=UTF-8' })
                    }))
                }
                o.subscribe((res) => {
                    var resData = res.json();
                    if (resData.code === 200) {
                        if (cache) {
                            var cacheArr = this.ajaxCache.get(url) || [];
                            resData.timestamp = Date.now();
                            resData.params = params;
                            var cacheObj = this.common.copy(resData);
                            cacheArr.push(cacheObj);
                            this.ajaxCache.set(url, cacheArr);
                        }
                        resolve(resData.data);
                    } else {
                        reject(resData);
                    }
                }, (error: any) => {
                    reject(error);
                })
            }
        })
    }
}
