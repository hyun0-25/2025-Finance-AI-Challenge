package com.project.backend.schedules.exception;

import com.project.backend.global.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ScheduleErrorCode implements ErrorCode {
    SCHEDULE_NOT_FOUND(HttpStatus.NOT_FOUND, "SCHEDULE_001", "일정 정보를 찾을 수 없습니다."),
    USER_IS_NOT_SCHEDULE_WRITER(HttpStatus.BAD_REQUEST, "SCHEDULE_002", "일정 생성자가 아닙니다.")
    ;

    private final HttpStatus status;
    private final String errorCode;
    private final String message;
}
