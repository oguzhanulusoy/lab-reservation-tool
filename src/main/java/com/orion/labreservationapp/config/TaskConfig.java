package com.orion.labreservationapp.config;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.Scheduled;

import com.orion.labreservationapp.entity.Reservation;
import com.orion.labreservationapp.mail.RemindingMail;
import com.orion.labreservationapp.repos.ReservationRepository;

import lombok.AllArgsConstructor;

@Configuration
@EnableAsync
@AllArgsConstructor
public class TaskConfig {

    @Autowired
    private RemindingMail remindMail;

    private ReservationRepository reservationRepository;

    @Async
    @Scheduled(cron = "0 0 0 * * ?")
    public void sendRemindMessage() {
        Date dt = new Date();
        Calendar c = Calendar.getInstance(); 
        c.setTime(dt); 
        c.add(Calendar.DATE, 1);
        dt = c.getTime();
        List<Reservation> reservations = reservationRepository.findByReservationStartDateAndIsDeleted(new java.sql.Date(dt.getTime()), false);
        for (Reservation res : reservations) {
            remindMail.send(res.getUser().getEmail(), res.getServer().getServerName(), 
            res.getDescription(), (java.sql.Date) res.getReservationStartDate(), (java.sql.Date) res.getReservationEndDate());
        }
    }
}
