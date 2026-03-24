package com.garage.gvsts.repository;

import com.garage.gvsts.entity.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface HolidayRepository extends JpaRepository<Holiday, Integer> {
    List<Holiday> findByHolidayDate(LocalDate date);
    List<Holiday> findByHolidayDateBetween(LocalDate startDate, LocalDate endDate);
}