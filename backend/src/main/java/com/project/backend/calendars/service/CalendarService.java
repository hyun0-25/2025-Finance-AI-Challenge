package com.project.backend.calendars.service;

import com.project.backend.calendars.dto.response.CalendarResponseDto;
import com.project.backend.calendars.dto.response.ScheduleListResponseDto;
import com.project.backend.global.exception.BaseException;
import com.project.backend.global.exception.GlobalErrorCode;
import com.project.backend.schedules.domain.Schedule;
import com.project.backend.schedules.domain.ScheduleFrequencyType;
import com.project.backend.schedules.dto.response.ScheduleResponseDto;
import com.project.backend.schedules.exception.ScheduleErrorCode;
import com.project.backend.schedules.repository.ScheduleRepository;
import com.project.backend.users.domain.User;
import com.project.backend.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CalendarService {
    @Value("${TEST_USER_UUID}")
    private UUID userId;
    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;

    public CalendarResponseDto getCalendar(int year, int month) {
        log.info("{ CalendarService } : calendar 조회");
        if(year < 2000 || !(month >= 1 && month <= 12))
            throw BaseException.type(GlobalErrorCode.VALIDATION_ERROR);
        LocalDate monthStart = LocalDate.of(year, month, 1);
        LocalDateTime start = monthStart.atStartOfDay();
        LocalDateTime end = monthStart.withDayOfMonth(monthStart.lengthOfMonth()).atTime(23, 59, 59);
        User user = userRepository.findByUUIDAnAndIsDeleted(userId);

        List<Schedule> schedules = scheduleRepository.findScheduleByUserIdAndDate(user.getUserId(), start, end);
        List<ScheduleListResponseDto> scheduleListResponseDtos = new ArrayList<>();

        for(Schedule s: schedules){
            if(s.getScheduleFrequency() == ScheduleFrequencyType.NONE)
                scheduleListResponseDtos.add(ScheduleListResponseDto.fromScheduleList(s));
            else{
                scheduleListResponseDtos.addAll(repeatSchedules(s, start, end));
            }
        }

        log.info("{ CalendarService } : calendar 조회 성공");
        return CalendarResponseDto.fromCalendar(year, month, scheduleListResponseDtos);
    }

    public List<ScheduleListResponseDto> repeatSchedules(Schedule schedule, LocalDateTime start, LocalDateTime end){
        List<ScheduleListResponseDto> scheduleListResponseDtos = new ArrayList<>();

        // 반복 시작일자
        LocalDateTime scheduleStart = schedule.getScheduleStartDate();
        LocalDateTime scheduleEnd = schedule.getScheduleEndDate();


        // 해당 년/월의 반복 시작일자 찾기
        while(scheduleStart.isBefore(start) && scheduleEnd.isBefore(start)){
            LocalDateTime[] next = addInterval(schedule.getScheduleFrequency(), scheduleStart, scheduleEnd);
            scheduleStart = next[0];
            scheduleEnd = next[1];
        }
        log.info(" >> scheduleStart : " + scheduleStart);
        log.info(" >> scheduleEnd : " + scheduleEnd);

        // 반복 종료일자 -> 해당 년/월의 종료일자보다 작으면 반복종료일, 크면 말일
        LocalDateTime repeatEnd = schedule.getScheduleRepeatEndDate().isBefore(end)
                ? schedule.getScheduleRepeatEndDate() : end;

        while(scheduleStart.isBefore(repeatEnd) || scheduleStart.isEqual(repeatEnd)){
            scheduleListResponseDtos.add(ScheduleListResponseDto.fromScheduleListRepeat(schedule, scheduleStart, scheduleEnd));

            LocalDateTime[] next = addInterval(schedule.getScheduleFrequency(), scheduleStart, scheduleEnd);
            scheduleStart = next[0];
            scheduleEnd = next[1];
        }

        return scheduleListResponseDtos;
    }

    public LocalDateTime[] addInterval(ScheduleFrequencyType scheduleFrequencyType, LocalDateTime scheduleStart, LocalDateTime scheduleEnd){
        return switch (scheduleFrequencyType) {
            case DAILY -> new LocalDateTime[]{scheduleStart.plusDays(1), scheduleEnd.plusDays(1)};
            case WEEKLY -> new LocalDateTime[]{scheduleStart.plusWeeks(1), scheduleEnd.plusWeeks(1)};
            case MONTHLY -> new LocalDateTime[]{scheduleStart.plusMonths(1), scheduleEnd.plusMonths(1)};
            case YEARLY -> new LocalDateTime[]{scheduleStart.plusYears(1), scheduleEnd.plusYears(1)};
            default -> new LocalDateTime[]{scheduleStart, scheduleEnd};
        };
    }
}
