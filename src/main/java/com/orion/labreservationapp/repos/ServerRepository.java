package com.orion.labreservationapp.repos;

import com.orion.labreservationapp.entity.Server;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServerRepository extends JpaRepository<Server,Long> {
    void deleteByIdIn(List<Long> ids);
}