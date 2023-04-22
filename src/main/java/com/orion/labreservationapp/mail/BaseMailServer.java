package com.orion.labreservationapp.mail;

import java.sql.Date;
import java.util.Calendar;
import java.util.Properties;

import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSenderImpl;

public final class BaseMailServer {
    private static volatile BaseMailServer instance;
    public JavaMailSenderImpl mailSender;

    private BaseMailServer() {
        this.mailSender = new JavaMailSenderImpl();
        this.mailSender.setHost(System.getenv("MAIL_HOST"));
        this.mailSender.setPort(Integer.parseInt(System.getenv("MAIL_PORT")));
        this.mailSender.setUsername(System.getenv("MAIL_USERNAME"));
        this.mailSender.setPassword(System.getenv("MAIL_PASSWORD"));

        Properties props = this.mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");
    }

    public static BaseMailServer getInstance() {
        BaseMailServer result = instance;
        if (result != null) {
            return result;
        }

        synchronized(BaseMailServer.class) {
            if (instance == null) {
                instance = new BaseMailServer();
            }
            
            return instance;
        }
    }

    public long getTotalDays(Date startDate, Date endDate) {
        long millisecsPerDay = 86400000;
        Calendar startCalendar = Calendar.getInstance();
        startCalendar.setTime(startDate);
        Calendar endCalender = Calendar.getInstance();
        endCalender.setTime(endDate);

        double endL = endCalender.getTimeInMillis()
                + endCalender.getTimeZone().getOffset(endCalender.getTimeInMillis());
        double startL = startCalendar.getTimeInMillis()
                + startCalendar.getTimeZone().getOffset(startCalendar.getTimeInMillis());

        return Math.round((endL - startL) / millisecsPerDay);
    }

    public void sendMail(MimeMessage message) {
        new Thread(new Runnable() {
            public void run() {
                try{
                    mailSender.send(message);
                } catch(Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }
}
