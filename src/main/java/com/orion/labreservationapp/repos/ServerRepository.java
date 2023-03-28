package com.orion.labreservationapp.repos;

import com.orion.labreservationapp.entity.Server;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServerRepository extends JpaRepository<Server,Long> {
}
