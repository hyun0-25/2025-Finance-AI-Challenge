package com.project.backend.notifications.controller;

import com.project.backend.notifications.dto.request.FcmMessageRequestDto;
import com.project.backend.notifications.dto.response.NotificationResponseDto;
import com.project.backend.notifications.service.NotificationService;
import com.project.backend.schedules.dto.response.ScheduleResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping
    public ResponseEntity<List<NotificationResponseDto>> getUserNotifications(){
        log.info("{ NotificationController } : Notification 리스트 조회 진입");
        List<NotificationResponseDto> notificationResponseDtoList = notificationService.getNotifications();
        log.info("{ NotificationController } : Notification 리스트 조회 성공");
        return ResponseEntity.ok(notificationResponseDtoList);
    }

}
