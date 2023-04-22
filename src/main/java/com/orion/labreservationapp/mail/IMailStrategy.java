package com.orion.labreservationapp.mail;

import java.sql.Date;

public interface IMailStrategy {
    boolean send(String to, String serverName, String description, Date startDate, Date endDate);
}