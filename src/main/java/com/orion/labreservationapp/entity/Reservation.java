package com.orion.labreservationapp.entity;

import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import lombok.experimental.FieldDefaults;
import lombok.AccessLevel;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "reservations")
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    User user;

    @OneToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    @JoinColumn(name = "server_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    Server server;
    
    @Temporal(TemporalType.DATE)
    Date reservationStartDate;
    
    @Temporal(TemporalType.DATE)
    Date reservationEndDate;
    
    Boolean isDeleted;
}
