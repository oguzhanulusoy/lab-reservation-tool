class ReservationService {
    async getReservations(serviceCaller, queryParams) {
        return await serviceCaller.get("/reservations", queryParams, undefined)
    }

    async addReservation(serviceCaller, requestBody) {
        const headers = { 'Content-Type': 'application/json' }
        return await serviceCaller.post('/reservations', undefined, headers, requestBody)
    }

    async updateReservation(serviceCaller, requestBody, reservationId) {
        const headers = { 'Content-Type': 'application/json' }
        return await serviceCaller.update(`/reservations/${reservationId}`, undefined, headers, requestBody)
    }

    async deleteReservations(serviceCaller, requestBody) {
        const headers = { 'Content-Type': 'application/json' }
        return await serviceCaller.delete('/reservations', undefined, headers, requestBody)
    }
}

export default new ReservationService();