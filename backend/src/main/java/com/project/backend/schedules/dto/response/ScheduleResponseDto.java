package com.project.backend.schedules.dto.response;

import com.project.backend.schedules.domain.Schedule;
import com.project.backend.schedules.domain.ScheduleFrequencyType;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
public record ScheduleResponseDto(
        Long scheduleId,
        UUID userId,
        LocalDateTime scheduleStartDate,
        LocalDateTime scheduleEndDate,
        ScheduleFrequencyType scheduleFrequencyType,
        LocalDateTime scheduleRepeatStartDate,
        LocalDateTime scheduleRepeatEndDate,
        String scheduleName,
        String scheduleColor,
        Boolean scheduleIsChecklist
) {
    public static ScheduleResponseDto fromSchedule(Schedule schedule) {
        return ScheduleResponseDto.builder()
                .scheduleId(schedule.getScheduleId())
                .userId(schedule.getUser().getUserId())
                .scheduleStartDate(schedule.getScheduleStartDate())
                .scheduleEndDate(schedule.getScheduleEndDate())
                .scheduleFrequencyType(schedule.getScheduleFrequency())
                .scheduleRepeatStartDate(schedule.getScheduleRepeatStartDate())
                .scheduleRepeatEndDate(schedule.getScheduleRepeatEndDate())
                .scheduleName(schedule.getScheduleName())
                .scheduleColor(schedule.getScheduleColor())
                .scheduleIsChecklist(schedule.getScheduleIsChecklist())
                .build();
    }
}
