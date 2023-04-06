class RoleService {
    async getRoles(serviceCaller, queryParams) {
        return await serviceCaller.get('/roles', queryParams, undefined)
    }
}

export default new RoleService()