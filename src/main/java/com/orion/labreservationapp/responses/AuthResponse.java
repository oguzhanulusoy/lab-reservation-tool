package com.orion.labreservationapp.responses;

import lombok.Data;

@Data
public class AuthResponse {
    String token;
    Long userId;
    String role;
    String message;
}
