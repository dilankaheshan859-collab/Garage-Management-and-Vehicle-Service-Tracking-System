package com.garage.gvsts.controller;

import com.garage.gvsts.dto.ServiceTypeDTO;
import com.garage.gvsts.service.ServiceTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/service-types")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ServiceTypeController {
    private final ServiceTypeService serviceTypeService;
    
    @PostMapping
    public ResponseEntity<ServiceTypeDTO> createServiceType(@RequestBody ServiceTypeDTO dto) {
        ServiceTypeDTO created = serviceTypeService.createServiceType(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<ServiceTypeDTO> updateServiceType(@PathVariable Long id, @RequestBody ServiceTypeDTO dto) {
        ServiceTypeDTO updated = serviceTypeService.updateServiceType(id, dto);
        return ResponseEntity.ok(updated);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ServiceTypeDTO> getServiceType(@PathVariable Long id) {
        ServiceTypeDTO dto = serviceTypeService.getServiceType(id);
        return ResponseEntity.ok(dto);
    }
    
    @GetMapping
    public ResponseEntity<List<ServiceTypeDTO>> getAllServiceTypes() {
        List<ServiceTypeDTO> serviceTypes = serviceTypeService.getAllServiceTypes();
        return ResponseEntity.ok(serviceTypes);
    }
    
    @GetMapping("/active")
    public ResponseEntity<List<ServiceTypeDTO>> getActiveServiceTypes() {
        List<ServiceTypeDTO> serviceTypes = serviceTypeService.getActiveServiceTypes();
        return ResponseEntity.ok(serviceTypes);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteServiceType(@PathVariable Long id) {
        serviceTypeService.deleteServiceType(id);
        return ResponseEntity.noContent().build();
    }
}
