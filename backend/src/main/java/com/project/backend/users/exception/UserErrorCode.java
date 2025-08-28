package com.project.backend.users.exception;

import com.project.backend.global.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum UserErrorCode implements ErrorCode {
    USER_NAME_NOT_ALLOWED(HttpStatus.BAD_REQUEST, "USER_001", "이름을 1자 이상 입력해주세요.");
    private final HttpStatus status;
    private final String errorCode;
    private final String message;
}
