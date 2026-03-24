package com.garage.gvsts.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDTO {
    private Long customerId;
    private String customerName;
    private String email;
    private String phone;
    private String address;
    private String city;
    private String postalCode;
}
