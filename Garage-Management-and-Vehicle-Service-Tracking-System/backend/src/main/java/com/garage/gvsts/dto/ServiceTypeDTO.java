package com.garage.gvsts.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceTypeDTO {
    private Long serviceTypeId;
    private String serviceName;
    private String description;
    private Integer estimatedDuration;
    private BigDecimal cost;
    private Boolean isActive;
}
