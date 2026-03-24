package com.garage.gvsts.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "vehicles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vehicleId;
    
    @Column(unique = true, nullable = false)
    private String vehicleRegistration;
    
    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;
    
    @Column(nullable = false)
    private String make;
    
    @Column(nullable = false)
    private String model;
    
    @Column(nullable = false)
    private Integer vehicle_year;
    
    private String color;
    private String vehicleType;
    
    @Column(unique = true)
    private String licensePlate;
    
    @Column(unique = true, length = 17)
    private String vin;
    
    private Integer mileage;
    private String fuelType;
    
    @Column(name = "date_added")
    private LocalDateTime dateAdded;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        dateAdded = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
