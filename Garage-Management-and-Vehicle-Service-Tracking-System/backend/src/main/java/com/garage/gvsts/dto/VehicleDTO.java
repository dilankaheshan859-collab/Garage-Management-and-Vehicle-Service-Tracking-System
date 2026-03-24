package com.garage.gvsts.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleDTO {
    private Long vehicleId;
    private String vehicleRegistration;
    private Long customerId;
    private String make;
    private String model;
    private Integer year;
    private String color;
    private String vehicleType;
    private String licensePlate;
    private String vin;
    private Integer mileage;
    private String fuelType;
}
