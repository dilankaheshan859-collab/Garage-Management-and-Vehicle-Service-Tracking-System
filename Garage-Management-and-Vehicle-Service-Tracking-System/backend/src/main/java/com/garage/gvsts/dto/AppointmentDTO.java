package com.garage.gvsts.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDTO {
    private Long appointmentId;
    private Long vehicleId;
    private Long customerId;
    private String vehicleRegistration;
    private String vehicleMake;
    private String vehicleModel;
    private Integer vehicleYear;
    private String vehicleType;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String customerAddress;
    private String customerCity;
    private String customerPostalCode;
    private LocalDate appointmentDate;
    private LocalTime appointmentTime;
    private Long serviceTypeId;
    private String serviceName;
    private String status;
    private String notes;
    private String cancellationReason;
    private String assignedMechanic;
}
