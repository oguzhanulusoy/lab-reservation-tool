package com.orion.labreservationapp.controller;

import com.orion.labreservationapp.entity.Reservation;
import com.orion.labreservationapp.requests.ReservationCreateRequest;
import com.orion.labreservationapp.requests.ReservationUpdateRequest;
import com.orion.labreservationapp.responses.ReservationDeleteResponse;
import com.orion.labreservationapp.responses.ReservationResponse;
import com.orion.labreservationapp.security.JwtTokenProvider;
import com.orion.labreservationapp.service.ReservationService;
import com.orion.labreservationapp.utils.IdWrapper;

import lombok.AllArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/reservations")
@AllArgsConstructor
public class ReservationController {

    private ReservationService reservationService;
    private JwtTokenProvider jwtTokenProvider;

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

    @DeleteMapping
    public ResponseEntity<ReservationDeleteResponse> deleteReservations(@RequestHeader Map<String, String> headers, @RequestBody IdWrapper ids) {
        GrantedAuthority userRole = jwtTokenProvider.getRoleFromToken(headers.get("authorization").substring(7));
        Long userId = jwtTokenProvider.getUserIdFromJwt(headers.get("authorization").substring(7));
        ReservationDeleteResponse result = reservationService.deleteReservationById(ids, userRole.equals("SUPER_USER"), userId);

        return ResponseEntity.ok(result);
    }

}