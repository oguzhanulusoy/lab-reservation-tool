package com.orion.labreservationapp.controller;

import com.orion.labreservationapp.entity.Reservation;
import com.orion.labreservationapp.requests.ReservationCreateRequest;
import com.orion.labreservationapp.requests.ReservationUpdateRequest;
import com.orion.labreservationapp.responses.ReservationResponse;
import com.orion.labreservationapp.service.ReservationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    private ReservationService reservationService;

    public ReservationController(ReservationService reservationService){
        this.reservationService = reservationService;
    }

    //Check this again.
    @GetMapping
    public List<ReservationResponse> getAllReservations(@RequestParam Optional<Long> userId) {
        return reservationService.getAllReservations(userId);
    }

    @PostMapping
    public Reservation createOneReservation(@RequestBody ReservationCreateRequest newReservationRequest) {
        return reservationService.createOneReservation(newReservationRequest);
    }

    @GetMapping("/{reservationId}")
    public Reservation getOneReservation(@PathVariable Long reservationId) {
        return reservationService.getOneReservationById(reservationId);
    }

    @PutMapping("/{reservationId}")
    public Reservation updateOneReservation(@PathVariable Long reservationId,
                                            @RequestBody ReservationUpdateRequest updateReservation) {
        return reservationService.updateOneReservationById(reservationId,updateReservation);
    }

    @DeleteMapping("/{reservationId}")
    public void deleteOneReservation(@PathVariable Long reservationId) {
        reservationService.deleteOneReservationById(reservationId);
    }


}