package com.project.backend.schedules.controller;

import com.project.backend.schedules.dto.request.ScheduleRequestDto;
import com.project.backend.schedules.dto.response.ScheduleResponseDto;
import com.project.backend.schedules.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/schedules")
public class ScheduleController {
    private final ScheduleService scheduleService;

    @PostMapping
    public ResponseEntity<ScheduleResponseDto> createSchedule(@RequestBody ScheduleRequestDto scheduleRequestDto){
        log.info("{ ScheduleController } : Schedule 생성 진입");
        ScheduleResponseDto scheduleResponseDto = scheduleService.createSchedule(scheduleRequestDto);
        log.info("{ ScheduleController } : Schedule 생성 성공");

        return ResponseEntity.status(HttpStatus.CREATED).body(scheduleResponseDto);
    }

}
