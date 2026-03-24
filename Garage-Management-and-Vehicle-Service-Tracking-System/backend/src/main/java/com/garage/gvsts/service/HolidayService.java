package com.garage.gvsts.service;

import com.garage.gvsts.dto.HolidayDTO;
import com.garage.gvsts.entity.Holiday;
import com.garage.gvsts.repository.HolidayRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HolidayService {
    private final HolidayRepository holidayRepository;
    
    public HolidayDTO createHoliday(HolidayDTO dto) {
        Holiday holiday = new Holiday();
        holiday.setHolidayDate(dto.getHolidayDate());
        holiday.setName(dto.getName());
        
        Holiday saved = holidayRepository.save(holiday);
        return mapToDTO(saved);
    }
    
    public HolidayDTO getHoliday(Integer id) {
        Holiday holiday = holidayRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Holiday not found"));
        return mapToDTO(holiday);
    }
    
    public List<HolidayDTO> getAllHolidays() {
        return holidayRepository.findAll().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    
    public List<HolidayDTO> getHolidaysByDateRange(LocalDate startDate, LocalDate endDate) {
        return holidayRepository.findByHolidayDateBetween(startDate, endDate).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }
    
    public void deleteHoliday(Integer id) {
        holidayRepository.deleteById(id);
    }
    
    private HolidayDTO mapToDTO(Holiday holiday) {
        HolidayDTO dto = new HolidayDTO();
        dto.setId(holiday.getId());
        dto.setHolidayDate(holiday.getHolidayDate());
        dto.setName(holiday.getName());
        return dto;
    }
}
