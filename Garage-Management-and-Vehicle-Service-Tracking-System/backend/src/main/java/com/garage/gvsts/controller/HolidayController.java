package com.garage.gvsts.controller;

import com.garage.gvsts.dto.HolidayDTO;
import com.garage.gvsts.service.HolidayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/holidays")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class HolidayController {
    private final HolidayService holidayService;

    @PostMapping
    public ResponseEntity<HolidayDTO> createHoliday(@RequestBody HolidayDTO dto) {
        try {
            HolidayDTO created = holidayService.createHoliday(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<HolidayDTO>> getAllHolidays() {
        List<HolidayDTO> holidays = holidayService.getAllHolidays();
        return ResponseEntity.ok(holidays);
    }

    @GetMapping("/range")
    public ResponseEntity<List<HolidayDTO>> getHolidaysByDateRange(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        List<HolidayDTO> holidays = holidayService.getHolidaysByDateRange(startDate, endDate);
        return ResponseEntity.ok(holidays);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHoliday(@PathVariable Integer id) {
        holidayService.deleteHoliday(id);
        return ResponseEntity.noContent().build();
    }
}