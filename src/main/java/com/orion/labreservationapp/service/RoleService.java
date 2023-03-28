package com.orion.labreservationapp.service;

import com.orion.labreservationapp.entity.Role;
import com.orion.labreservationapp.repos.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {
    RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<Role> getAllRole() {
        return roleRepository.findAll();
    }

    public Role saveOneRole(Role newRole) {
        return roleRepository.save(newRole);
    }

    public Role getOneRoleById(Long roleId) {
        return roleRepository.findById(roleId).orElse(null);
    }

    public Role updateOneRole(Long roleId,Role newRole) {
        Optional<Role> role = roleRepository.findById(roleId);
        if (role.isPresent())
        {
            Role foundRole = role.get();
            foundRole.setRoleName(newRole.getRoleName());
            roleRepository.save(foundRole);
            return foundRole;
        }
        else
        {
            return null;
        }
    }

    public void deleteById(Long roleId) {
        roleRepository.deleteById(roleId);
    }
}
