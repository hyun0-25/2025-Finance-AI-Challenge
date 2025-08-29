package com.project.backend.calendars.controller;

import com.project.backend.calendars.dto.response.CalendarResponseDto;
import com.project.backend.calendars.service.CalendarService;
import com.project.backend.schedules.dto.response.ScheduleResponseDto;
import com.project.backend.schedules.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/calendars")
public class CalendarController {
    private final CalendarService calendarService;

    @GetMapping
    public ResponseEntity<CalendarResponseDto> getCalendar(
            @RequestParam int year,
            @RequestParam int month
    ) {
        log.info("{ CalendarController } : Calendar 조회 진입");
        log.info(" >> year : " + year);
        log.info(" >> month : " + month);
        CalendarResponseDto calendarResponseDto = calendarService.getCalendar(year, month);
        log.info("{ CalendarController } : Calendar 조회 성공");
        return ResponseEntity.ok(calendarResponseDto);
    }
}