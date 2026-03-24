package com.garage.gvsts.service;

import com.garage.gvsts.dto.CustomerDTO;
import com.garage.gvsts.entity.Customer;
import com.garage.gvsts.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerService {
    private final CustomerRepository customerRepository;
    
    public CustomerDTO createCustomer(CustomerDTO dto) {
        Customer customer = new Customer();
        customer.setCustomerName(dto.getCustomerName());
        customer.setEmail(dto.getEmail());
        customer.setPhone(dto.getPhone());
        customer.setAddress(dto.getAddress());
        customer.setCity(dto.getCity());
        customer.setPostalCode(dto.getPostalCode());
        
        Customer saved = customerRepository.save(customer);
        return mapToDTO(saved);
    }
    
    public CustomerDTO updateCustomer(Long id, CustomerDTO dto) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        
        customer.setCustomerName(dto.getCustomerName());
        customer.setEmail(dto.getEmail());
        customer.setPhone(dto.getPhone());
        customer.setAddress(dto.getAddress());
        customer.setCity(dto.getCity());
        customer.setPostalCode(dto.getPostalCode());
        
        Customer updated = customerRepository.save(customer);
        return mapToDTO(updated);
    }
    
    public CustomerDTO getCustomer(Long id) {
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        return mapToDTO(customer);
    }
    
    public List<CustomerDTO> getAllCustomers() {
        return customerRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
    
    private CustomerDTO mapToDTO(Customer customer) {
        CustomerDTO dto = new CustomerDTO();
        dto.setCustomerId(customer.getCustomerId());
        dto.setCustomerName(customer.getCustomerName());
        dto.setEmail(customer.getEmail());
        dto.setPhone(customer.getPhone());
        dto.setAddress(customer.getAddress());
        dto.setCity(customer.getCity());
        dto.setPostalCode(customer.getPostalCode());
        return dto;
    }
}
