package com.orion.labreservationapp.requests;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ServerCreateRequest {
    String serverName;
    String serverLocation;
    String serverIp;
    String serialNumber;
    String serverType;
    Boolean isHost;
}
