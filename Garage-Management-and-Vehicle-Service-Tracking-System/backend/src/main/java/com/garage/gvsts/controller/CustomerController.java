package com.garage.gvsts.controller;

import com.garage.gvsts.dto.CustomerDTO;
import com.garage.gvsts.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/customers")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {
    private final CustomerService customerService;
    
    @PostMapping
    public ResponseEntity<CustomerDTO> createCustomer(@RequestBody CustomerDTO dto) {
        CustomerDTO created = customerService.createCustomer(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<CustomerDTO> updateCustomer(@PathVariable Long id, @RequestBody CustomerDTO dto) {
        CustomerDTO updated = customerService.updateCustomer(id, dto);
        return ResponseEntity.ok(updated);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<CustomerDTO> getCustomer(@PathVariable Long id) {
        CustomerDTO dto = customerService.getCustomer(id);
        return ResponseEntity.ok(dto);
    }
    
    @GetMapping
    public ResponseEntity<List<CustomerDTO>> getAllCustomers() {
        List<CustomerDTO> customers = customerService.getAllCustomers();
        return ResponseEntity.ok(customers);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.noContent().build();
    }
}
