package com.project.backend.calendars.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record CalendarResponseDto(
        int year,
        int month,
        List<ScheduleListResponseDto> scheduleListResponseDtoList
) {
    public static CalendarResponseDto fromCalendar(int year, int month, List<ScheduleListResponseDto> scheduleListResponseDtoList){
        return CalendarResponseDto.builder()
                .year(year)
                .month(month)
                .scheduleListResponseDtoList(scheduleListResponseDtoList)
                .build();
    }
}
