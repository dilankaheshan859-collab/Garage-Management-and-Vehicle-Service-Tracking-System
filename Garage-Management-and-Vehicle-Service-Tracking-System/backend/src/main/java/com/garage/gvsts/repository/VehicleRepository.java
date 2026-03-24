package com.garage.gvsts.repository;

import com.garage.gvsts.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByCustomerCustomerId(Long customerId);
    Optional<Vehicle> findByVehicleRegistration(String registration);
    Optional<Vehicle> findByLicensePlate(String licensePlate);
    Optional<Vehicle> findByVin(String vin);
}
