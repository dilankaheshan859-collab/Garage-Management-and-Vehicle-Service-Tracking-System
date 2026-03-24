package com.garage.gvsts.service;

import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final JavaMailSender mailSender;

    public void sendCancellationEmail(String customerEmail, String reason) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(customerEmail);
        message.setSubject("Appointment Cancellation Notice - Theekshana Motors");
        message.setText("Dear Customer,\n\n" +
                "We regret to inform you that your appointment has been cancelled.\n\n" +
                "Reason for cancellation: " + reason + "\n\n" +
                "We apologize for any inconvenience caused. Please contact us to reschedule your appointment.\n\n" +
                "Best regards,\n" +
                "Theekshana Motors Team");

        mailSender.send(message);
    }

    public void sendCompletionEmail(String customerEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(customerEmail);
        message.setSubject("Your Vehicle Service is Complete - Theekshana Motors");
        message.setText("Dear Customer,\n\n" +
                "Great news! Your vehicle service has been completed successfully.\n\n" +
                "Your vehicle is now ready for pickup. Please visit our garage at your earliest convenience.\n\n" +
                "Thank you for choosing Theekshana Motors for your automotive needs.\n\n" +
                "Best regards,\n" +
                "Theekshana Motors Team");

        mailSender.send(message);
    }
}