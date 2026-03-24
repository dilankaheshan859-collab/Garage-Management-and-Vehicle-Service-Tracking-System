package com.garage.gvsts.service;

import com.garage.gvsts.dto.AppointmentDTO;
import com.garage.gvsts.entity.Appointment;
import com.garage.gvsts.entity.Customer;
import com.garage.gvsts.entity.ServiceType;
import com.garage.gvsts.entity.Vehicle;
import com.garage.gvsts.repository.AppointmentRepository;
import com.garage.gvsts.repository.CustomerRepository;
import com.garage.gvsts.repository.ServiceTypeRepository;
import com.garage.gvsts.repository.VehicleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AppointmentService {
    private final AppointmentRepository appointmentRepository;
    private final CustomerRepository customerRepository;
    private final VehicleRepository vehicleRepository;
    private final ServiceTypeRepository serviceTypeRepository;
    
    public AppointmentDTO createAppointment(AppointmentDTO dto) {
        // --- Customer retrieval / auto-create ---
        Customer customer = null;
        if (dto.getCustomerId() != null) {
            customer = customerRepository.findById(dto.getCustomerId()).orElse(null);
        }
        if (customer == null && dto.getCustomerEmail() != null) {
            customer = customerRepository.findByEmail(dto.getCustomerEmail()).orElse(null);
        }
        if (customer == null && dto.getCustomerName() != null) {
            customer = customerRepository.findByCustomerName(dto.getCustomerName()).orElse(null);
        }

        if (customer == null) {
            customer = new Customer();
            customer.setCustomerName(dto.getCustomerName() != null ? dto.getCustomerName() : "Unknown Customer");
            customer.setEmail(dto.getCustomerEmail());
            customer.setPhone(dto.getCustomerPhone() != null ? dto.getCustomerPhone() : "");
            customer.setAddress(dto.getCustomerAddress());
            customer.setCity(dto.getCustomerCity());
            customer.setPostalCode(dto.getCustomerPostalCode());
            customer = customerRepository.save(customer);
        }

        // --- Vehicle retrieval / auto-create ---
        Vehicle vehicle = null;
        if (dto.getVehicleId() != null) {
            vehicle = vehicleRepository.findById(dto.getVehicleId()).orElse(null);
        }

        if (vehicle == null && dto.getVehicleRegistration() != null) {
            vehicle = vehicleRepository.findByVehicleRegistration(dto.getVehicleRegistration()).orElse(null);
        }

        if (vehicle == null) {
            if (dto.getVehicleRegistration() == null || dto.getVehicleRegistration().trim().isEmpty()) {
                throw new RuntimeException("Vehicle registration is required when creating a new appointment for a new vehicle");
            }

            vehicle = new Vehicle();
            vehicle.setVehicleRegistration(dto.getVehicleRegistration());
            vehicle.setCustomer(customer);
            vehicle.setMake(dto.getVehicleMake() != null ? dto.getVehicleMake() : "Unknown");
            vehicle.setModel(dto.getVehicleModel() != null ? dto.getVehicleModel() : "Unknown");
            vehicle.setVehicle_year(dto.getVehicleYear() != null ? dto.getVehicleYear() : java.time.LocalDate.now().getYear());
            vehicle.setColor(dto.getVehicleType());
            vehicle.setVehicleType(dto.getVehicleType());
            vehicle.setLicensePlate(dto.getVehicleRegistration());
            vehicle.setMileage(0);
            vehicle.setFuelType(null);
            vehicle = vehicleRepository.save(vehicle);
        }

        if (vehicle.getCustomer() == null || !vehicle.getCustomer().getCustomerId().equals(customer.getCustomerId())) {
            vehicle.setCustomer(customer);
            vehicle = vehicleRepository.save(vehicle);
        }

        // Find service type by ID or name
        ServiceType serviceType = null;
        if (dto.getServiceTypeId() != null) {
            serviceType = serviceTypeRepository.findById(dto.getServiceTypeId())
                    .orElse(null);
        }
        if (serviceType == null && dto.getServiceName() != null && !dto.getServiceName().trim().isEmpty()) {
            serviceType = serviceTypeRepository.findByServiceName(dto.getServiceName().trim())
                    .orElse(null);

            // If service type does not exist, persist it so appointments can always show service name
            if (serviceType == null) {
                serviceType = new ServiceType();
                serviceType.setServiceName(dto.getServiceName().trim());
                serviceType.setDescription("Auto-created from appointment booking");
                serviceType.setEstimatedDuration(60);
                serviceType.setCost(BigDecimal.ZERO);
                serviceType.setIsActive(true);
                serviceType = serviceTypeRepository.save(serviceType);
            }
        }
        
        Appointment appointment = new Appointment();
        appointment.setCustomer(customer);
        appointment.setVehicle(vehicle);
        appointment.setAppointmentDate(dto.getAppointmentDate());
        appointment.setAppointmentTime(dto.getAppointmentTime());
        appointment.setServiceType(serviceType);
        appointment.setNotes(dto.getNotes());
        appointment.setAssignedMechanic(dto.getAssignedMechanic());
        // Set customer email from DTO or customer entity
        if (dto.getCustomerEmail() != null && !dto.getCustomerEmail().isEmpty()) {
            appointment.setCustomerEmail(dto.getCustomerEmail());
        } else if (customer.getEmail() != null) {
            appointment.setCustomerEmail(customer.getEmail());
        }
        
        if (dto.getStatus() != null) {
            appointment.setStatus(dto.getStatus().toUpperCase());
        } else {
            appointment.setStatus("PENDING");
        }
        
        Appointment saved = appointmentRepository.save(appointment);
        return mapToDTO(saved);
    }
    
    public AppointmentDTO updateAppointment(Long id, AppointmentDTO dto) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        if (dto.getAppointmentDate() != null) {
            appointment.setAppointmentDate(dto.getAppointmentDate());
        }
        if (dto.getAppointmentTime() != null) {
            appointment.setAppointmentTime(dto.getAppointmentTime());
        }
        if (dto.getStatus() != null) {
            appointment.setStatus(dto.getStatus().toUpperCase());
        }
        if (dto.getNotes() != null) {
            appointment.setNotes(dto.getNotes());
        }
        if (dto.getCancellationReason() != null) {
            appointment.setCancellationReason(dto.getCancellationReason());
        }
        if (dto.getAssignedMechanic() != null) {
            appointment.setAssignedMechanic(dto.getAssignedMechanic());
        }
        if (dto.getCustomerEmail() != null) {
            appointment.setCustomerEmail(dto.getCustomerEmail());
        }

        // Update serviceType on appointment if requested
        if (dto.getServiceTypeId() != null) {
            serviceTypeRepository.findById(dto.getServiceTypeId()).ifPresent(appointment::setServiceType);
        } else if (dto.getServiceName() != null && !dto.getServiceName().trim().isEmpty()) {
            ServiceType serviceTypeUpdate = serviceTypeRepository.findByServiceName(dto.getServiceName().trim())
                    .orElseGet(() -> {
                        ServiceType newService = new ServiceType();
                        newService.setServiceName(dto.getServiceName().trim());
                        newService.setDescription("Auto-created from appointment update");
                        newService.setEstimatedDuration(60);
                        newService.setCost(BigDecimal.ZERO);
                        newService.setIsActive(true);
                        return serviceTypeRepository.save(newService);
                    });
            appointment.setServiceType(serviceTypeUpdate);
        }


        // Update associated customer fields
        if (appointment.getCustomer() != null) {
            if (dto.getCustomerName() != null) appointment.getCustomer().setCustomerName(dto.getCustomerName());
            if (dto.getCustomerEmail() != null) appointment.getCustomer().setEmail(dto.getCustomerEmail());
            if (dto.getCustomerPhone() != null) appointment.getCustomer().setPhone(dto.getCustomerPhone());
            if (dto.getCustomerAddress() != null) appointment.getCustomer().setAddress(dto.getCustomerAddress());
            if (dto.getCustomerCity() != null) appointment.getCustomer().setCity(dto.getCustomerCity());
            if (dto.getCustomerPostalCode() != null) appointment.getCustomer().setPostalCode(dto.getCustomerPostalCode());
            customerRepository.save(appointment.getCustomer());
        }

        // Update vehicle fields
        if (appointment.getVehicle() != null) {
            if (dto.getVehicleRegistration() != null) appointment.getVehicle().setVehicleRegistration(dto.getVehicleRegistration());
            if (dto.getVehicleMake() != null) appointment.getVehicle().setMake(dto.getVehicleMake());
            if (dto.getVehicleModel() != null) appointment.getVehicle().setModel(dto.getVehicleModel());
            if (dto.getVehicleYear() != null) appointment.getVehicle().setVehicle_year(dto.getVehicleYear());
            if (dto.getVehicleType() != null) appointment.getVehicle().setVehicleType(dto.getVehicleType());
            if (dto.getCustomerId() != null) {
                customerRepository.findById(dto.getCustomerId()).ifPresent(appointment.getVehicle()::setCustomer);
            }
            vehicleRepository.save(appointment.getVehicle());
        }

        Appointment updated = appointmentRepository.save(appointment);
        return mapToDTO(updated);
    }    
    public AppointmentDTO getAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));
        return mapToDTO(appointment);
    }
    
    public List<AppointmentDTO> getAllAppointments() {
        return appointmentRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    
    public List<AppointmentDTO> getAppointmentsByDate(LocalDate date) {
        return appointmentRepository.findByAppointmentDate(date).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    
    public List<AppointmentDTO> getAppointmentsByCustomer(Long customerId) {
        return appointmentRepository.findByCustomerCustomerId(customerId).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    
    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }
    
    private AppointmentDTO mapToDTO(Appointment appointment) {
        AppointmentDTO dto = new AppointmentDTO();
        dto.setAppointmentId(appointment.getAppointmentId());
        dto.setVehicleId(appointment.getVehicle().getVehicleId());
        dto.setCustomerId(appointment.getCustomer().getCustomerId());
        dto.setAppointmentDate(appointment.getAppointmentDate());
        dto.setAppointmentTime(appointment.getAppointmentTime());
        if (appointment.getServiceType() != null) {
            dto.setServiceTypeId(appointment.getServiceType().getServiceTypeId());
            dto.setServiceName(appointment.getServiceType().getServiceName());
        }
        dto.setStatus(appointment.getStatus());
        dto.setNotes(appointment.getNotes());
        dto.setCancellationReason(appointment.getCancellationReason());
        dto.setAssignedMechanic(appointment.getAssignedMechanic());
        if (appointment.getCustomer() != null) {
            dto.setCustomerName(appointment.getCustomer().getCustomerName());
            dto.setCustomerEmail(appointment.getCustomer().getEmail());
            dto.setCustomerPhone(appointment.getCustomer().getPhone());
            dto.setCustomerAddress(appointment.getCustomer().getAddress());
            dto.setCustomerCity(appointment.getCustomer().getCity());
            dto.setCustomerPostalCode(appointment.getCustomer().getPostalCode());
        }
        if (appointment.getVehicle() != null) {
            dto.setVehicleId(appointment.getVehicle().getVehicleId());
            dto.setVehicleRegistration(appointment.getVehicle().getVehicleRegistration());
            dto.setVehicleMake(appointment.getVehicle().getMake());
            dto.setVehicleModel(appointment.getVehicle().getModel());
            dto.setVehicleYear(appointment.getVehicle().getVehicle_year());
            dto.setVehicleType(appointment.getVehicle().getVehicleType());
        }
        dto.setCustomerEmail(appointment.getCustomerEmail());
        return dto;
    }

    public AppointmentDTO cancelAppointment(Long id, String reason) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setStatus("CANCELLED");
        appointment.setCancellationReason(reason);

        Appointment saved = appointmentRepository.save(appointment);
        return mapToDTO(saved);
    }

    public AppointmentDTO completeAppointment(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        appointment.setStatus("COMPLETED");

        Appointment saved = appointmentRepository.save(appointment);
        return mapToDTO(saved);
    }
}
