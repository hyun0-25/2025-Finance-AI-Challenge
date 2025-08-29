package com.project.backend.calendars.exception;

import com.project.backend.global.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CalendarErrorCode implements ErrorCode {
    CALENDAR_NOT_FOUND(HttpStatus.NOT_FOUND, "SCHEDULE_001", "일정 정보를 찾을 수 없습니다."),
    ;

    private final HttpStatus status;
    private final String errorCode;
    private final String message;
}
