package com.orion.labreservationapp.requests;

import lombok.Data;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.sql.Date;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReservationUpdateRequest {
    Long serverId;

    @Temporal(TemporalType.DATE)
    Date reservationStartDate;

    @Temporal(TemporalType.DATE)
    Date reservationEndDate;

    String description;
}