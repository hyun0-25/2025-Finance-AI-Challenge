package com.project.backend.global.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum GlobalErrorCode implements ErrorCode{
    OBJECT_ALREADY_DELETED(HttpStatus.BAD_REQUEST, "REQUEST_001", "이미 삭제된 객체입니다."),
    VALIDATION_ERROR(HttpStatus.BAD_REQUEST, "REQUEST_002", "잘못된 요청입니다.")
    ;

    private final HttpStatus status;
    private final String errorCode;
    private final String message;

    GlobalErrorCode(HttpStatus status, String errorCode, String message) { //BaseResponseStatus 에서 각 해당하는 코드를 생성자로 맵핑
        this.status = status;
        this.errorCode = errorCode;
        this.message = message;
    }
}