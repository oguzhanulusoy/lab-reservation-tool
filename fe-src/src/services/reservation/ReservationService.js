import {mainUrl} from "store/constant"

class ReservationService {
  
/*     addReservation(serviceCaller, requestBody,callback,errorCallBack){
    let headers= { 'Content-Type': 'application/json'};
        serviceCaller.post(mainUrl + "/reservations/add", undefined, headers, requestBody, callback, errorCallBack)
    } */
    getReservations(serviceCaller, queryParams, callback,errorCallBack){
        serviceCaller.get(mainUrl+"/reservations", queryParams, undefined  ,  callback, errorCallBack)
    }
/*     updateReservation(serviceCaller, requestBody,callback,errorCallBack){
        let headers= { 'Content-Type': 'application/json'};
        serviceCaller.update(mainUrl + "/reservations", undefined, headers, requestBody, callback, errorCallBack)
    }*/
    /*deleteReservation(serviceCaller, requestBody, callback,errorCallBack){
        let headers = {'Accept': 'application/json','Content-Type': 'application/json'};
        serviceCaller.delete(mainUrl + "/reservations", undefined, headers  , requestBody, callback, errorCallBack)
    } */
}

export default new ReservationService();