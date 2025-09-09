package com.project.backend.notifications.exception;

import com.project.backend.global.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum NotificationErrorCode implements ErrorCode {
    FIREBASE_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "NOTIFICATION_001", "알림 전송을 실패했습니다."),
    FIREBASE_INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "NOTIFICATION_002", "유저의 Firebase 토큰이 존재하지 않습니다.");

    private final HttpStatus status;
    private final String errorCode;
    private final String message;
}