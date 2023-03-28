package com.orion.labreservationapp.requests;

import lombok.Data;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.sql.Date;

@Data
public class ReservationCreateRequest {
    Long id;
    Long userId;
    Long serverId;

    @Temporal(TemporalType.DATE)
    Date reservationStartDate;

    @Temporal(TemporalType.DATE)
    Date reservationEndDate;
}