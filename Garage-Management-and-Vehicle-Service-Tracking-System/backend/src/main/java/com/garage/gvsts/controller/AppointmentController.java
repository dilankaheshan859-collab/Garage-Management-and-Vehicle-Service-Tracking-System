package com.garage.gvsts.controller;

import com.garage.gvsts.dto.AppointmentDTO;
import com.garage.gvsts.service.AppointmentService;
import com.garage.gvsts.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class AppointmentController {
    private final AppointmentService appointmentService;
    private final NotificationService notificationService;
    
    @PostMapping
    public ResponseEntity<?> createAppointment(@RequestBody AppointmentDTO dto) {
        try {
            AppointmentDTO created = appointmentService.createAppointment(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Failed to create appointment: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> updateAppointment(@PathVariable Long id, @RequestBody AppointmentDTO dto) {
        try {
            AppointmentDTO updated = appointmentService.updateAppointment(id, dto);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(e.getMessage()));
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<AppointmentDTO> getAppointment(@PathVariable Long id) {
        AppointmentDTO dto = appointmentService.getAppointment(id);
        return ResponseEntity.ok(dto);
    }
    
    @GetMapping
    public ResponseEntity<List<AppointmentDTO>> getAllAppointments() {
        List<AppointmentDTO> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }
    
    @GetMapping("/date/{date}")
    public ResponseEntity<List<AppointmentDTO>> getAppointmentsByDate(@PathVariable LocalDate date) {
        List<AppointmentDTO> appointments = appointmentService.getAppointmentsByDate(date);
        return ResponseEntity.ok(appointments);
    }
    
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<AppointmentDTO>> getAppointmentsByCustomer(@PathVariable Long customerId) {
        List<AppointmentDTO> appointments = appointmentService.getAppointmentsByCustomer(customerId);
        return ResponseEntity.ok(appointments);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelAppointment(@PathVariable Long id, @RequestBody Map<String, String> request) {
        try {
            String reason = request.get("reason");
            if (reason == null || reason.trim().isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ErrorResponse("Cancellation reason is required"));
            }

            AppointmentDTO cancelled = appointmentService.cancelAppointment(id, reason.trim());

            // Send cancellation email if customer email is available
            if (cancelled.getCustomerEmail() != null && !cancelled.getCustomerEmail().isEmpty()) {
                try {
                    notificationService.sendCancellationEmail(cancelled.getCustomerEmail(), reason.trim());
                } catch (Exception e) {
                    // Log email failure but don't fail the cancellation
                    System.err.println("Failed to send cancellation email: " + e.getMessage());
                }
            }

            return ResponseEntity.ok(cancelled);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Failed to cancel appointment: " + e.getMessage()));
        }
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<?> completeAppointment(@PathVariable Long id) {
        try {
            AppointmentDTO completed = appointmentService.completeAppointment(id);

            // Send completion email if customer email is available
            if (completed.getCustomerEmail() != null && !completed.getCustomerEmail().isEmpty()) {
                try {
                    notificationService.sendCompletionEmail(completed.getCustomerEmail());
                } catch (Exception e) {
                    // Log email failure but don't fail the completion
                    System.err.println("Failed to send completion email: " + e.getMessage());
                }
            }

            return ResponseEntity.ok(completed);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Failed to complete appointment: " + e.getMessage()));
        }
    }

    // Inner class for error responses
    public static class ErrorResponse {
        public String message;
        
        public ErrorResponse(String message) {
            this.message = message;
        }
        
        public String getMessage() {
            return message;
        }
        
        public void setMessage(String message) {
            this.message = message;
        }
    }
}
