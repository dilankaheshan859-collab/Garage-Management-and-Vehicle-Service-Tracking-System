package com.garage.gvsts.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HolidayDTO {
    private Integer id;
    private LocalDate holidayDate;
    private String name;
}