package com.orion.labreservationapp.repos;

import com.orion.labreservationapp.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation,Long> {
    List<Reservation> findByUserIdAndIsDeleted(Long userId, Boolean isDeleted);

    List<Reservation> findByIsDeleted(Boolean isDeleted);

    List<Reservation> findByReservationStartDateAndIsDeleted(Date startDate, boolean isDeleted);
    
    boolean existsByServerId(Long zoneId);
}