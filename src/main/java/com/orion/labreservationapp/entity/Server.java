package com.orion.labreservationapp.entity;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import javax.persistence.*;

@Data
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "servers")
public class Server {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String serverName;
    String serverLocation;
    String serverIp;
    String serialNumber;
    String serverType;
    Boolean isHost;
}
