package com.orion.labreservationapp.service;

import com.orion.labreservationapp.entity.Reservation;
import com.orion.labreservationapp.entity.Server;
import com.orion.labreservationapp.entity.User;
import com.orion.labreservationapp.repos.ReservationRepository;
import com.orion.labreservationapp.requests.ReservationCreateRequest;
import com.orion.labreservationapp.requests.ReservationUpdateRequest;
import com.orion.labreservationapp.responses.ReservationResponse;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ReservationService {

    private ReservationRepository reservationRepository;
    private UserService userService;
    private ServerService serverService;

    public List<ReservationResponse> getAllReservations(Optional<Long> userId) {
        List<Reservation> list;
        if(userId.isPresent()) {
            list = reservationRepository.findByUserId(userId.get());
        }
        list = reservationRepository.findAll();
        return list.stream().map(reservation -> new ReservationResponse(reservation)).collect(Collectors.toList());
    }



    public Reservation getOneReservationById(Long reservationId){
        return reservationRepository.findById(reservationId).orElse(null);
    }
    public Reservation createOneReservation(ReservationCreateRequest newReservationRequest) {
        User user = userService.getOneUserById(newReservationRequest.getUserId());
        Server server = serverService.getOneServerById(newReservationRequest.getServerId());
        if(user == null || server == null)
            return null;
        Reservation toSave = new Reservation();
        toSave.setId(newReservationRequest.getId());
        toSave.setUser(user);
        toSave.setServer(server);
        toSave.setReservationStartDate(newReservationRequest.getReservationStartDate());
        toSave.setReservationEndDate(newReservationRequest.getReservationEndDate());
        return reservationRepository.save(toSave);
    }

    public Reservation updateOneReservationById(Long reservationId, ReservationUpdateRequest updateReservation) {
        Optional<Reservation> reservation = reservationRepository.findById(reservationId);
        if (reservation.isPresent())
        {
            Reservation toUpdate = reservation.get();
            toUpdate.setReservationStartDate((Date) updateReservation.getReservationStartDate());
            toUpdate.setReservationEndDate((Date) updateReservation.getReservationEndDate());
            reservationRepository.save(toUpdate);
            return toUpdate;
        }
        return null;
    }

    public void deleteOneReservationById(Long reservationId) {
        reservationRepository.deleteById(reservationId);
    }

    public boolean reservationExists(Long serverId) {
        return reservationRepository.existsByServerId(serverId);
    }
}