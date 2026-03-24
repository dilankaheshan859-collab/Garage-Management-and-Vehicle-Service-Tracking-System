package com.garage.gvsts.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Entity
@Table(name = "holidays")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Holiday {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private LocalDate holidayDate;

    @Column(nullable = false)
    private String name;
}