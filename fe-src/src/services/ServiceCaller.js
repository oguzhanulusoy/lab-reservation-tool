import { v1 as uuidv1 } from 'uuid';
import HttpUtil from 'utils/httpUtil';
class ServiceCaller {
    constructor() {
        const uuidOptions = {};

        this.correlationId = uuidv1(uuidOptions);
        this.accessToken = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyNiIsImlhdCI6MTY3MjEyNDUwOSwiZXhwIjoxNjcyMTI1MTE0fQ.UYLOSE5q616GKcdhfJL1cAGTt4msUy4v-9uoIYVNryV2JgMF8MjjsAsZTiNyQOyKQlkKi1tZ5M7_BFia7DDiRg";
        this.headers = {
            'X-Correlation-Id': this.correlationId,
            "Access-Control-Allow-Origin": "*",
            'Authorization' : this.accessToken
        };
        this.httpUtil = new HttpUtil();
        

    }

    get(url, queryParams, headers, callback, errorCallBack) {
        if(!headers){
            headers ={}
        }
        headers = Object.assign(headers, this.headers)
        this.httpUtil.get(url, queryParams, headers, callback, errorCallBack);
    }

    delete(url, queryParams, headers, requestBody, callback, errorCallBack) {
        if(!headers){
            headers ={}
        }
        headers = Object.assign(headers, this.headers)
        this.httpUtil.delete(url, queryParams, headers, requestBody, callback, errorCallBack);
    }

    post(url, queryParams, headers, requestBody, callback, errorCallBack) {
        if(!headers){
            headers ={}
        }
        headers = Object.assign(headers, this.headers)
        this.httpUtil.post(url, queryParams, headers, requestBody, callback, errorCallBack);
    }

    update(url, queryParams, headers, requestBody, callback, errorCallBack) {
        if(!headers){
            headers ={}
        }
        headers = Object.assign(headers, this.headers)
        this.httpUtil.update(url, queryParams, headers, requestBody, callback, errorCallBack);
    }
}

export default ServiceCaller;
