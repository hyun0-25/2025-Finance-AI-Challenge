package com.project.backend.notifications.dto.request;

import lombok.Builder;

import java.util.UUID;

@Builder
public record FcmMessageRequestDto(
        UUID userId,
        Long scheduleId,
        String title,
        String body
) {
    public static FcmMessageRequestDto toFcmMessage(UUID userId, Long scheduleId, String title, String body) {
        return FcmMessageRequestDto.builder()
                .userId(userId)
                .scheduleId(scheduleId)
                .title(title)
                .body(body)
                .build();
    }
}
