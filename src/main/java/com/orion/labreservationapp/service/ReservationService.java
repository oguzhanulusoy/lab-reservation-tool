package com.orion.labreservationapp.service;

import com.orion.labreservationapp.entity.Reservation;
import com.orion.labreservationapp.entity.Server;
import com.orion.labreservationapp.entity.User;
import com.orion.labreservationapp.mail.CreateMail;
import com.orion.labreservationapp.mail.DeleteMail;
import com.orion.labreservationapp.mail.UpdateMail;
import com.orion.labreservationapp.repos.ReservationRepository;
import com.orion.labreservationapp.requests.ReservationCreateRequest;
import com.orion.labreservationapp.requests.ReservationUpdateRequest;
import com.orion.labreservationapp.responses.ReservationDeleteResponse;
import com.orion.labreservationapp.responses.ReservationResponse;
import com.orion.labreservationapp.utils.IdWrapper;

import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
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
    
    @Autowired
    private CreateMail createMail;
    @Autowired
    private UpdateMail updateMail;
    @Autowired
    private DeleteMail deleteMail;

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
        toSave.setDescription(newReservationRequest.getDescription());

        Reservation result = reservationRepository.save(toSave);

        if (result != null) {
            createMail.send(result.getUser().getEmail(), server.getServerName(), newReservationRequest.getDescription(),
            newReservationRequest.getReservationStartDate(), newReservationRequest.getReservationEndDate());
        }

        return result;
    }

    public Reservation updateOneReservationById(Long reservationId, ReservationUpdateRequest updateReservation, Boolean isAdmin, Long userId) {
        Optional<Reservation> reservation = reservationRepository.findById(reservationId);
        if (!isAdmin && reservation.get().getUser().getId() != userId)
            return null;

        Server server = serverService.getOneServerById(updateReservation.getServerId());
        if(server == null)
            return null;

        if (reservation.isPresent()) {
            Reservation toUpdate = reservation.get();
            toUpdate.setServer(server);
            toUpdate.setReservationStartDate((Date) updateReservation.getReservationStartDate());
            toUpdate.setReservationEndDate((Date) updateReservation.getReservationEndDate());
            toUpdate.setDescription(updateReservation.getDescription());
            Reservation result = reservationRepository.save(toUpdate);

            if (result != null) {
                updateMail.send(result.getUser().getEmail(), server.getServerName(), updateReservation.getDescription(), 
                (Date) updateReservation.getReservationStartDate(), (Date) updateReservation.getReservationEndDate());
            }

            return result;
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

            deleteMail.send(reservation.getUser().getEmail(), reservation.getServer().getServerName(), reservation.getDescription(),
            (Date) reservation.getReservationStartDate(), (Date) reservation.getReservationEndDate());
        }

        response.setMessage("Reservations deleted successfully");
        response.setStatus("SUCCESS");

        return response;
    }

    public boolean reservationExists(Long serverId) {
        return reservationRepository.existsByServerId(serverId);
    }
}