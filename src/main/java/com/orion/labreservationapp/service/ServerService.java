package com.orion.labreservationapp.service;

import com.orion.labreservationapp.entity.Server;
import com.orion.labreservationapp.repos.ServerRepository;
import com.orion.labreservationapp.responses.ServerDeleteResponse;
import com.orion.labreservationapp.utils.IdWrapper;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
public class ServerService {

    ServerRepository serverRepository;
    // ReservationService reservationService;

    public List<Server> getAllService() {
        return serverRepository.findAll();
    }

    public Server saveOneServer(Server newServer) {
        return serverRepository.save(newServer);
    }

    public Server getOneServerById(Long serverId) {
        return serverRepository.findById(serverId).orElse(null);
    }

    public Server updateOneServer(Long serverId, Server newServer) {
        Optional<Server> server = serverRepository.findById(serverId);
        if (server.isPresent())
        {
            Server foundServer = server.get();
            foundServer.setServerName(newServer.getServerName());
            foundServer.setServerIp(newServer.getServerIp());
            foundServer.setSerialNumber(newServer.getSerialNumber());
            foundServer.setServerType(newServer.getServerType());
            foundServer.setIsHost(newServer.getIsHost());
            foundServer.setServerLocation(newServer.getServerLocation());
            serverRepository.save(foundServer);
            return foundServer;
        }
        else
        {
            return null;
        }
    }
    
    @Transactional
    public ServerDeleteResponse deleteServersByIds(IdWrapper ids) {
        ServerDeleteResponse response = new ServerDeleteResponse();

        for (Long id : ids.getIds()) {
            if (!serverRepository.existsById(id)) {
                response.setMessage("Server with Id " + id + " not found");
                response.setStatus("FAIL");
                return response;
            }

            // if (reservationService.reservationExists(id)) {
            //     response.setMessage("Server with Id " + id + " cannot be deleted");
            //     response.setStatus("FAIL");
            //     return response;
            // }
        }

        serverRepository.deleteByIdIn(ids.getIds());
        response.setMessage("Servers deleted successfully");
        response.setStatus("SUCCESS");

        return response;
    }
}
