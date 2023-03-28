import {mainUrl} from "store/constant"

class UserService {
    getUsers(serviceCaller, queryParams, callback,errorCallBack){
        serviceCaller.get(mainUrl+"/users", queryParams, undefined  ,  callback, errorCallBack)
    }
/*     updateUser(serviceCaller, requestBody,callback,errorCallBack){
        let headers= { 'Content-Type': 'application/json'};
        serviceCaller.update(mainUrl + "/users", undefined, headers, requestBody, callback, errorCallBack)
    }*/
    /*deleteUser(serviceCaller, requestBody, callback,errorCallBack){
        let headers = {'Accept': 'application/json','Content-Type': 'application/json'};
        serviceCaller.delete(mainUrl + "/users", undefined, headers  , requestBody, callback, errorCallBack)
    } */
}

export default new UserService();