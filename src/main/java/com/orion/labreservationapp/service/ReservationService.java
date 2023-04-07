package com.orion.labreservationapp.service;

import com.orion.labreservationapp.entity.Reservation;
import com.orion.labreservationapp.entity.Server;
import com.orion.labreservationapp.entity.User;
import com.orion.labreservationapp.repos.ReservationRepository;
import com.orion.labreservationapp.requests.ReservationCreateRequest;
import com.orion.labreservationapp.requests.ReservationUpdateRequest;
import com.orion.labreservationapp.responses.ReservationDeleteResponse;
import com.orion.labreservationapp.responses.ReservationResponse;
import com.orion.labreservationapp.utils.IdWrapper;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
public class ReservationService {

    private ReservationRepository reservationRepository;
    private UserService userService;
    private ServerService serverService;

    public List<ReservationResponse> getAllReservations(Optional<Long> userId) {
        List<Reservation> list;
        if(userId.isPresent()) {
            list = reservationRepository.findByUserIdAndIsDeleted(userId.get(), false);
        }
        list = reservationRepository.findByIsDeleted(false);
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
        toSave.setUser(user);
        toSave.setServer(server);
        toSave.setReservationStartDate(newReservationRequest.getReservationStartDate());
        toSave.setReservationEndDate(newReservationRequest.getReservationEndDate());
        toSave.setIsDeleted(false);
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

    @Transactional
    public ReservationDeleteResponse deleteReservationById(IdWrapper ids, Boolean isAdmin, Long userId) {
        ReservationDeleteResponse response = new ReservationDeleteResponse();
        if (!isAdmin) {
            for (Long id : ids.getIds()) {
                Reservation reservation = getOneReservationById(id);
                if (reservation.getUser().getId() != userId) {
                    response.setMessage("You can't delete someone else's reservation");
                    response.setStatus("FAIL");

                    return response;
                }
            }
        }

        Boolean isDeleted = true;

        for (Long id : ids.getIds()) {
            Reservation reservation = getOneReservationById(id);
            reservation.setIsDeleted(isDeleted);
            reservationRepository.save(reservation);
        }

        response.setMessage("Reservations deleted successfully");
        response.setStatus("SUCCESS");

        return response;
    }

    public boolean reservationExists(Long serverId) {
        return reservationRepository.existsByServerId(serverId);
    }
}