package com.project.backend.notifications.controller;

import com.project.backend.notifications.dto.request.FcmMessageRequestDto;
import com.project.backend.notifications.dto.response.NotificationResponseDto;
import com.project.backend.notifications.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
public class NotificationController {
    private final NotificationService notificationService;

    //알림 전송 테스트
    @PostMapping
    public ResponseEntity<NotificationResponseDto> createNotification(@RequestBody FcmMessageRequestDto fcmMessageRequestDto) {
        log.info("{ NotificationController } : Notification 생성 진입");
        NotificationResponseDto notificationResponseDto = notificationService.sendNotificationByUserUUID(fcmMessageRequestDto);
        log.info("{ NotificationController } : Notification 생성 성공");
        return ResponseEntity.status(HttpStatus.CREATED).body(notificationResponseDto);
    }

}
