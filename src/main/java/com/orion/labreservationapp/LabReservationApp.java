package com.orion.labreservationapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.sql.SQLException;

@SpringBootApplication
@EnableScheduling
public class LabReservationApp {
    public static void main(String[] args) throws SQLException {
        SpringApplication.run(LabReservationApp.class, args);
    }
}