package com.project.backend.schedules.service;

import com.project.backend.global.exception.BaseException;
import com.project.backend.schedules.domain.Schedule;
import com.project.backend.schedules.dto.request.ScheduleRequestDto;
import com.project.backend.schedules.dto.response.ScheduleResponseDto;
import com.project.backend.schedules.repository.ScheduleRepository;
import com.project.backend.users.domain.User;
import com.project.backend.users.dto.request.UserRequestDto;
import com.project.backend.users.dto.response.UserResponseDto;
import com.project.backend.users.exception.UserErrorCode;
import com.project.backend.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ScheduleService {

    @Value("${TEST_USER_UUID}")
    private UUID userId;
    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;

    public ScheduleResponseDto createSchedule(ScheduleRequestDto scheduleRequestDto) {
        log.info("{ ScheduleService } : schedule 생성");
        User user = userRepository.findByUUID(userId);
        Schedule schedule = Schedule.createSchedule(
                user,
                scheduleRequestDto.scheduleStartDate(),
                scheduleRequestDto.scheduleEndDate(),
                scheduleRequestDto.scheduleFrequencyType(),
                scheduleRequestDto.scheduleRepeatEndDate() == null ? null : scheduleRequestDto.scheduleStartDate(), // RepeatStartDate는 StartDate와 동일
                scheduleRequestDto.scheduleRepeatEndDate(),
                scheduleRequestDto.scheduleName(),
                scheduleRequestDto.scheduleColor(),
                scheduleRequestDto.scheduleIsChecklist());
        scheduleRepository.save(schedule);
        log.info("{ ScheduleService } : schedule 생성 성공");
        return ScheduleResponseDto.fromSchedule(schedule);
    }
}
