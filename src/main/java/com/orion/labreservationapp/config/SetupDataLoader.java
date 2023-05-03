package com.orion.labreservationapp.config;

import java.io.FileReader;
import java.io.Reader;

import javax.transaction.Transactional;

import org.apache.commons.csv.CSVFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.orion.labreservationapp.entity.Server;
import com.orion.labreservationapp.repos.ServerRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class SetupDataLoader implements ApplicationListener<ContextRefreshedEvent> {
    private boolean alreadySetup = false;
    @Autowired
    private ServerRepository serverRepository;

    @Override
    @Transactional
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if (alreadySetup) return;
        insertMoviesFromCSV();
        alreadySetup = true;
    }
    

    void insertMoviesFromCSV() {
        try (Reader in = new FileReader(new ClassPathResource("data.csv").getFile())) {
            CSVFormat.RFC4180.builder()
                .setAllowMissingColumnNames(true).setHeader("ID", "SERVER_NAME", "SERVER_LOCATION", "SERVER_IP", "SERIAL_NUMBER", "SERVER_TYPE", "IS_HOST")
                .setSkipHeaderRecord(true).build().parse(in).forEach(record -> {
                    Server server = new Server();
                    server.setId(Long.parseLong(record.get("ID")));
                    server.setIsHost(record.get("IS_HOST").equals("1"));
                    server.setSerialNumber(record.get("SERIAL_NUMBER"));
                    server.setServerIp(record.get("SERVER_IP"));
                    server.setServerName(record.get("SERVER_NAME"));
                    server.setServerLocation(record.get("SERVER_LOCATION"));
                    server.setServerType(record.get("SERVER_TYPE"));
                    serverRepository.save(server);
                });
        } catch (Exception e) {
            log.error("Unable to read CSV file", e);
        }
    }
}
