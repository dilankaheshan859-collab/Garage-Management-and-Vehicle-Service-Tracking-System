package com.garage.gvsts.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appointmentId;
    
    @ManyToOne
    @JoinColumn(name = "vehicle_id", nullable = false)
    private Vehicle vehicle;
    
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;
    
    private String customerEmail;
    
    @Column(nullable = false)
    private LocalDate appointmentDate;
    
    @Column(nullable = false)
    private LocalTime appointmentTime;
    
    @ManyToOne
    @JoinColumn(name = "service_type_id")
    private ServiceType serviceType;
    
    @Column(nullable = false)
    private String status = "PENDING";
    
    private String notes;
    
    private String cancellationReason;
    
    @Column(name = "assigned_mechanic")
    private String assignedMechanic;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (status == null) {
            status = "PENDING";
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    public enum AppointmentStatus {
        PENDING, CONFIRMED, COMPLETED, CANCELLED
    }
}
