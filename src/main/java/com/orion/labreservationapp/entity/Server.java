package com.orion.labreservationapp.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "servers")
@Data
public class Server {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    String serverName;
    String serverLocation;
    String serverIp;
    String serialNumber;
    String serverType;
    Boolean isHost;
}
