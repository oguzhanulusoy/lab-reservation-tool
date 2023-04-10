package com.orion.labreservationapp.controller;

import com.orion.labreservationapp.entity.Role;
import com.orion.labreservationapp.service.RoleService;

import lombok.AllArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
@AllArgsConstructor
public class RoleController {
    private RoleService roleService;

    @PreAuthorize("hasAuthority('SUPER_USER')")
    @GetMapping
    public List<Role> getAllRole(){
        return roleService.getAllRole();
    }

    @PreAuthorize("hasAuthority('SUPER_USER')")
    @PostMapping
    public Role createRole(@RequestBody Role newRole){
        return roleService.saveOneRole(newRole);
    }

    @PreAuthorize("hasAuthority('SUPER_USER')")
    @GetMapping("/{roleId}")
    public Role getOneRoleById(@PathVariable Long roleId){
        return roleService.getOneRoleById(roleId);
    }

    @PreAuthorize("hasAuthority('SUPER_USER')")
    @PutMapping("/{roleId}")
    public Role updateOneRole(@PathVariable Long roleId,@RequestBody Role newRole) {
        return roleService.updateOneRole(roleId,newRole);
    }

    @PreAuthorize("hasAuthority('SUPER_USER')")
    @DeleteMapping("/{roleId}")
    public void deleteOneRole(@PathVariable Long roleId){
        roleService.deleteById(roleId);
    }
}
