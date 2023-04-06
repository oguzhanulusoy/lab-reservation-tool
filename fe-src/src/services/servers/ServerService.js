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
}

export default new ServerService();