class ServerService {
    async getServers(serviceCaller, queryParams) {
        return await serviceCaller.get("/servers", queryParams, undefined);
    }

    async addServer(serviceCaller, requestBody) {
        const headers = { 'Content-Type': 'application/json' };
        return await serviceCaller.post('/servers', undefined, headers, requestBody);
    }

    async deleteServers(serviceCaller, requestBody) {
        const headers = { 'Content-Type': 'application/json' };
        return await serviceCaller.delete('/servers', undefined, headers, requestBody);
    }

    async updateServer(serviceCaller, requestBody, serverId) {
        const headers = { 'Content-Type': 'application/json' };
        return await serviceCaller.update(`/servers/${serverId}`, undefined, headers, requestBody);
    }
/*     addServer(serviceCaller, requestBody,callback,errorCallBack){
    let headers= { 'Content-Type': 'application/json'};
        serviceCaller.post(mainUrl + "/servers/add", undefined, headers, requestBody, callback, errorCallBack)
    } */
    // getServers(serviceCaller, queryParams, callback,errorCallBack){
    //     serviceCaller.get(mainUrl+"/servers", queryParams, undefined  ,  callback, errorCallBack)
    // }
/*     updateProduct(serviceCaller, requestBody,callback,errorCallBack){
        let headers= { 'Content-Type': 'application/json'};
        serviceCaller.update(mainUrl + "/products", undefined, headers, requestBody, callback, errorCallBack)
    }*/
    /*deleteRole(serviceCaller, requestBody, callback,errorCallBack){
        let headers = {'Accept': 'application/json','Content-Type': 'application/json'};
        serviceCaller.delete(mainUrl + "/role", undefined, headers  , requestBody, callback, errorCallBack)
    } */
}

export default new ServerService();