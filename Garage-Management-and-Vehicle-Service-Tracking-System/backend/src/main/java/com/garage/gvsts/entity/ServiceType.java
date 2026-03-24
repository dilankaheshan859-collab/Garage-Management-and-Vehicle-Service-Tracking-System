package com.garage.gvsts.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "service_types")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long serviceTypeId;
    
    @Column(nullable = false)
    private String serviceName;
    
    private String description;
    
    private Integer estimatedDuration;
    
    @Column(nullable = false)
    private BigDecimal cost;
    
    @Column(name = "is_active")
    private Boolean isActive;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
        if (isActive == null) {
            isActive = true;
        }
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
