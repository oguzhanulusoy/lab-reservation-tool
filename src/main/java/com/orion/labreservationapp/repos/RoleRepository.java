package com.orion.labreservationapp.repos;

import com.orion.labreservationapp.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Long> {
}
