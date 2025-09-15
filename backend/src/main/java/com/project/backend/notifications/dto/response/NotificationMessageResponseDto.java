package com.project.backend.notifications.dto.response;

public record NotificationMessageResponseDto(
        String notificationTitle,
        String notificationContent
) {
}
