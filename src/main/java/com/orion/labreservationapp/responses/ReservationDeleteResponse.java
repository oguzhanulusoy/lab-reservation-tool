package com.orion.labreservationapp.responses;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReservationDeleteResponse {
    String message;
    String status;
}
