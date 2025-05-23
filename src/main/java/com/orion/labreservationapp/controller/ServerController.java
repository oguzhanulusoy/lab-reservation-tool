package com.orion.labreservationapp.controller;

import com.orion.labreservationapp.entity.Server;
import com.orion.labreservationapp.requests.ServerCreateRequest;
import com.orion.labreservationapp.responses.ServerDeleteResponse;
import com.orion.labreservationapp.responses.ServerResponse;
import com.orion.labreservationapp.service.ServerService;
import com.orion.labreservationapp.utils.IdWrapper;

import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/servers")
@AllArgsConstructor
public class ServerController {
    
    private ServerService serverService;

    @GetMapping
    public List<Server> getAllService(){
        return serverService.getAllService();
    }

    @PreAuthorize("hasAuthority('SUPER_USER')")
    @PostMapping
    public ResponseEntity<ServerResponse> crateServer(@Valid @RequestBody ServerCreateRequest newServerRequest){
        ServerResponse serverResponse = new ServerResponse();
        Server newServer = new Server();
        newServer.setIsHost(newServerRequest.getIsHost());
        newServer.setSerialNumber(newServerRequest.getSerialNumber());
        newServer.setServerIp(newServerRequest.getServerIp());
        newServer.setServerLocation(newServerRequest.getServerLocation());
        newServer.setServerName(newServerRequest.getServerName());
        newServer.setServerType(newServerRequest.getServerType());

        Server createdServer = serverService.saveOneServer(newServer);
        serverResponse.setId(createdServer.getId());
        serverResponse.setIsHost(createdServer.getIsHost());
        serverResponse.setSerialNumber(createdServer.getSerialNumber());
        serverResponse.setServerIp(createdServer.getServerIp());
        serverResponse.setServerLocation(createdServer.getServerLocation());
        serverResponse.setServerName(createdServer.getServerName());
        serverResponse.setServerType(createdServer.getServerType());

        return new ResponseEntity<ServerResponse>(serverResponse, HttpStatus.CREATED);
    }

    @GetMapping("/{serverId}")
    public Server getOneServerById(@PathVariable Long serverId){
        return serverService.getOneServerById(serverId);
    }

    @PreAuthorize("hasAuthority('SUPER_USER')")
    @PutMapping("/{serverId}")
    public Server updateOneServer(@PathVariable Long serverId,@RequestBody Server newServer){
        return serverService.updateOneServer(serverId,newServer);
    }
    
    @PreAuthorize("hasAuthority('SUPER_USER')")
    @DeleteMapping
    public ResponseEntity<ServerDeleteResponse> deleteServer(@RequestBody IdWrapper ids) {
        ServerDeleteResponse result = serverService.deleteServersByIds(ids);
        return ResponseEntity.ok(result);
    }
}
