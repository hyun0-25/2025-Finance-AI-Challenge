package com.project.backend.calendars.dto.response;

import com.project.backend.schedules.domain.Schedule;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record ScheduleListResponseDto(
        Long scheduleId,
        LocalDateTime scheduleStartDate,
        LocalDateTime scheduleEndDate,
        String scheduleName,
        String scheduleColor
) {
    public static ScheduleListResponseDto fromScheduleList(Schedule schedule){
        return ScheduleListResponseDto.builder()
                .scheduleId(schedule.getScheduleId())
                .scheduleStartDate(schedule.getScheduleStartDate())
                .scheduleEndDate(schedule.getScheduleEndDate())
                .scheduleName(schedule.getScheduleName())
                .scheduleColor(schedule.getScheduleColor())
                .build();
    }

    public static ScheduleListResponseDto fromScheduleListRepeat(Schedule schedule, LocalDateTime start, LocalDateTime end){
        return ScheduleListResponseDto.builder()
                .scheduleId(schedule.getScheduleId())
                .scheduleStartDate(start)
                .scheduleEndDate(end)
                .scheduleName(schedule.getScheduleName())
                .scheduleColor(schedule.getScheduleColor())
                .build();
    }
}
