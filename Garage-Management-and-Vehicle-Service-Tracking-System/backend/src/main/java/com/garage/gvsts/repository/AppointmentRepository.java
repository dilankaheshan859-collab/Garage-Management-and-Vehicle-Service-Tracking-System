package com.garage.gvsts.repository;

import com.garage.gvsts.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByAppointmentDate(LocalDate date);
    List<Appointment> findByVehicleVehicleId(Long vehicleId);
    List<Appointment> findByCustomerCustomerId(Long customerId);
    List<Appointment> findByAppointmentDateBetween(LocalDate startDate, LocalDate endDate);
}
