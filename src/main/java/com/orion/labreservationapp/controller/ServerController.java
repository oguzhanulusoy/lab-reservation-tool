package com.orion.labreservationapp.controller;

import com.orion.labreservationapp.entity.Server;
import com.orion.labreservationapp.service.ServerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/servers")
public class ServerController {

    private ServerService serverService;

    public ServerController(ServerService serverService) {
        this.serverService = serverService;
    }

    @GetMapping
    public List<Server> getAllService(){
        return serverService.getAllService();
    }

    @PostMapping
    public Server crateServer(@RequestBody Server newServer){
        return serverService.saveOneUser(newServer);
    }

    @GetMapping("/{serverId}")
    public Server getOneServerById(@PathVariable Long serverId){
        //custom exception
        return serverService.getOneServerById(serverId);
    }

    @PutMapping("/{serverId}")
    public Server updateOneServer(@PathVariable Long serverId,@RequestBody Server newServer){
        return serverService.updateOneServer(serverId,newServer);
    }

    @DeleteMapping("/{serverId}")
    public void deleteOneServer(@PathVariable Long serverId){
        serverService.deleteById(serverId);
    }
}
