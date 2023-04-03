package com.orion.labreservationapp.requests;

import lombok.Data;

@Data
public class RegisterUserRequest {
    String username;
    String password;
    String repeat_password;
    String email;
    String first_name;
    String last_name;
}
