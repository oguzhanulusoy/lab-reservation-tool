package com.orion.labreservationapp.controller;

import com.orion.labreservationapp.entity.Role;
import com.orion.labreservationapp.entity.Server;
import com.orion.labreservationapp.service.RoleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/roles")
public class RoleController {
    private RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public List<Role> getAllRole(){
        return roleService.getAllRole();
    }

    @PostMapping
    public Role createRole(@RequestBody Role newRole){
        return roleService.saveOneRole(newRole);
    }

    @GetMapping("/{roleId}")
    public Role getOneRoleById(@PathVariable Long roleId){
        return roleService.getOneRoleById(roleId);
    }

    @PutMapping("/{roleId}")
    public Role updateOneRole(@PathVariable Long roleId,@RequestBody Role newRole) {
        return roleService.updateOneRole(roleId,newRole);
    }

    @DeleteMapping("/{roleId}")
    public void deleteOneRole(@PathVariable Long roleId){
        roleService.deleteById(roleId);
    }
}
