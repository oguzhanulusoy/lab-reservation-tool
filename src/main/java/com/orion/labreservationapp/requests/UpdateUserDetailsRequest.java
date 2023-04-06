package com.orion.labreservationapp.requests;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateUserDetailsRequest {
    String firstName;
    String lastName;
    String username;
    String email;
    Long roleId;
}
