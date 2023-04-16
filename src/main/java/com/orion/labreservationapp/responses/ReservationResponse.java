package com.orion.labreservationapp.responses;

import com.orion.labreservationapp.entity.Reservation;
import lombok.Data;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.util.Date;

@Data
public class ReservationResponse {
    Long id;
    Long userId;
    String firstName;
    String lastName;
    Long serverId;
    String serverName;
    @Temporal(TemporalType.DATE)
    Date reservationStartDate;
    @Temporal(TemporalType.DATE)
    Date reservationEndDate;

    String description;

    public ReservationResponse(Reservation entity){ // for mapping. => mapper
        this.id = entity.getId();
        this.userId = entity.getUser().getId();
        this.firstName = entity.getUser().getFirstName();
        this.lastName = entity.getUser().getLastName();
        this.serverId = entity.getServer().getId();
        this.serverName = entity.getServer().getServerName();
        this.reservationStartDate = entity.getReservationStartDate();
        this.reservationEndDate = entity.getReservationEndDate();
        this.description = entity.getDescription();
    }

}