package com.project.backend.cards.exception;

import com.project.backend.global.exception.ErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum CardErrorCode implements ErrorCode {
    CARD_NOT_FOUND(HttpStatus.NOT_FOUND, "CARD_001", "카드 정보를 찾을 수 없습니다."),
    ALREADY_USER_CARD(HttpStatus.CONFLICT, "CARD_002", "이미 보유중인 카드입니다."),
    ;

    private final HttpStatus status;
    private final String errorCode;
    private final String message;
}
