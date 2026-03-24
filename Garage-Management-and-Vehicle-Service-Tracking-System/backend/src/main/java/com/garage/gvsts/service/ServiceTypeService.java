package com.garage.gvsts.service;

import com.garage.gvsts.dto.ServiceTypeDTO;
import com.garage.gvsts.entity.ServiceType;
import com.garage.gvsts.repository.ServiceTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceTypeService {
    private final ServiceTypeRepository serviceTypeRepository;
    
    public ServiceTypeDTO createServiceType(ServiceTypeDTO dto) {
        ServiceType serviceType = new ServiceType();
        serviceType.setServiceName(dto.getServiceName());
        serviceType.setDescription(dto.getDescription());
        serviceType.setEstimatedDuration(dto.getEstimatedDuration());
        serviceType.setCost(dto.getCost());
        serviceType.setIsActive(dto.getIsActive() != null ? dto.getIsActive() : true);
        
        ServiceType saved = serviceTypeRepository.save(serviceType);
        return mapToDTO(saved);
    }
    
    public ServiceTypeDTO updateServiceType(Long id, ServiceTypeDTO dto) {
        ServiceType serviceType = serviceTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service type not found"));
        
        serviceType.setServiceName(dto.getServiceName());
        serviceType.setDescription(dto.getDescription());
        serviceType.setEstimatedDuration(dto.getEstimatedDuration());
        serviceType.setCost(dto.getCost());
        if (dto.getIsActive() != null) {
            serviceType.setIsActive(dto.getIsActive());
        }
        
        ServiceType updated = serviceTypeRepository.save(serviceType);
        return mapToDTO(updated);
    }
    
    public ServiceTypeDTO getServiceType(Long id) {
        ServiceType serviceType = serviceTypeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Service type not found"));
        return mapToDTO(serviceType);
    }
    
    public List<ServiceTypeDTO> getAllServiceTypes() {
        return serviceTypeRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    
    public List<ServiceTypeDTO> getActiveServiceTypes() {
        return serviceTypeRepository.findByIsActive(true).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    
    public void deleteServiceType(Long id) {
        serviceTypeRepository.deleteById(id);
    }
    
    private ServiceTypeDTO mapToDTO(ServiceType serviceType) {
        ServiceTypeDTO dto = new ServiceTypeDTO();
        dto.setServiceTypeId(serviceType.getServiceTypeId());
        dto.setServiceName(serviceType.getServiceName());
        dto.setDescription(serviceType.getDescription());
        dto.setEstimatedDuration(serviceType.getEstimatedDuration());
        dto.setCost(serviceType.getCost());
        dto.setIsActive(serviceType.getIsActive());
        return dto;
    }
}
