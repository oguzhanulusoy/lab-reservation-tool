package com.orion.labreservationapp.mail;

import java.nio.charset.StandardCharsets;
import java.sql.Date;
import java.util.HashMap;
import java.util.Map;

import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DeleteMail implements IMailStrategy{

    private final String template = "delete-reservation.html"; 
    private final BaseMailServer mailServer = BaseMailServer.getInstance();
    private final SpringTemplateEngine templateEngine;

    @Override
    public boolean send(String to, String serverName, String description, Date startDate, Date endDate) {
        MimeMessage message = createMail(to, serverName);
        if (message == null) return false;

        try {
            mailServer.sendMail(message);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private MimeMessage createMail(String to, String serverName) {
        try {
            MimeMessage message = mailServer.mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED, StandardCharsets.UTF_8.name());
            
            Context context = new Context();
            context.setVariables(getProperties(serverName));
            helper.setFrom(System.getenv("MAIL_USERNAME"));
            helper.setTo(to);
            helper.setSubject("Reservation Deleted");
            String html = templateEngine.process(template, context);
            helper.setText(html, true);
            
            return message;
        } catch(Exception e) {
            return null;
        }
    }

    private final Map<String, Object> getProperties(String serverName) {
        Map<String, Object> properties = new HashMap<>();
        properties.put("serverName", serverName);

        return properties;
    }
}
