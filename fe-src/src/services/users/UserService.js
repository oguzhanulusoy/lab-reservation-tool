class UserService {
    async getUsers(serviceCaller, queryParams) {
        return await serviceCaller.get("/user", queryParams, undefined);
    }

    async updateUser(serviceCaller, requestBody, userId) {
        const headers = { 'Content-Type': 'application/json' }
        return await serviceCaller.update(`/user/${userId}`, undefined, headers, requestBody)
    }

    async getUserById(serviceCaller, userId) {
        return await serviceCaller.get(`/user/${userId}`, '', undefined)
    }
}

export default new UserService();