package com.project.backend.schedules.dto.request;

import com.project.backend.schedules.domain.ScheduleFrequencyType;

import java.time.LocalDateTime;

public record ScheduleRequestDto(
        LocalDateTime scheduleStartDate,
        LocalDateTime scheduleEndDate,
        LocalDateTime scheduleRepeatEndDate,
        ScheduleFrequencyType scheduleFrequencyType,
        String scheduleName,
        String scheduleColor,
        Boolean scheduleIsChecklist
) {
}
