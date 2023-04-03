package com.orion.labreservationapp.responses;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ServerResponse {
    Long Id;
    String serverName;
    String serverLocation;
    String serverIp;
    String serialNumber;
    String serverType;
    Boolean isHost;
}
