package com.project.backend.notifications.dto.response;

import com.project.backend.notifications.domain.UserNotification;
import lombok.Builder;

import java.util.UUID;

@Builder
public record NotificationResponseDto(
        Long notificationId,
        UUID userId,
        Long scheduleId,
        String title,
        String body
) {
    public static NotificationResponseDto fromNotification(UserNotification notification) {
        return NotificationResponseDto.builder()
                .notificationId(notification.getNotificationId())
                .userId(notification.getUser().getUserId())
                .scheduleId(notification.getSchedule().getScheduleId())
                .title(notification.getNotificationTitle())
                .body(notification.getNotificationBody())
                .build();
    }
}
