package com.orion.labreservationapp.service;

import com.orion.labreservationapp.entity.Server;
import com.orion.labreservationapp.repos.ServerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ServerService {

    ServerRepository serverRepository;

    public ServerService(ServerRepository serverRepository) {
        this.serverRepository = serverRepository;
    }

    public List<Server> getAllService() {
        return serverRepository.findAll();
    }

    public Server saveOneUser(Server newServer) {
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
            serverRepository.save(foundServer);
            return foundServer;
        }
        else
        {
            return null;
        }
    }

    public void deleteById(Long serverId) {
        serverRepository.deleteById(serverId);
    }
}
