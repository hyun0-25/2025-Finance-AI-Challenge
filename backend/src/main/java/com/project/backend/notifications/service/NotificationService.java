package com.project.backend.notifications.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import com.project.backend.global.exception.BaseException;
import com.project.backend.notifications.domain.UserNotification;
import com.project.backend.notifications.dto.request.FcmMessageRequestDto;
import com.project.backend.notifications.dto.response.NotificationResponseDto;
import com.project.backend.notifications.exception.NotificationErrorCode;
import com.project.backend.notifications.repository.NotificationRepository;
import com.project.backend.schedules.domain.Schedule;
import com.project.backend.schedules.exception.ScheduleErrorCode;
import com.project.backend.schedules.repository.ScheduleRepository;
import com.project.backend.users.domain.User;
import com.project.backend.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static java.time.LocalDateTime.now;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class NotificationService {

    private final FirebaseMessaging firebaseMessaging;
    private final UserRepository userRepository;
    private final ScheduleRepository scheduleRepository;
    private final NotificationRepository notificationRepository;

    public NotificationResponseDto sendNotificationByUserUUID(FcmMessageRequestDto fcmMessageRequestDto) {
        log.info("{ NotificationService } : notification 생성 진입");
        User user = userRepository.findByUUIDAndIsDeleted(fcmMessageRequestDto.userId());
        Schedule schedule = scheduleRepository.findScheduleByScheduleIdAndIsDeleted(fcmMessageRequestDto.scheduleId());
        if (schedule == null)
            throw BaseException.type(ScheduleErrorCode.SCHEDULE_NOT_FOUND);

//        if(user.getFirebaseToken() != null){
//            Notification n = Notification.builder()
//                    .setTitle(fcmMessageRequestDto.title())
//                    .setBody(fcmMessageRequestDto.body())
//                    .build();
//            Message message = Message.builder()
//                .setToken(user.getFirebaseToken())
//                    .setNotification(n)
//                    .build();
//            try{
//                firebaseMessaging.send(message);
//                //알림 내역 생성
        UserNotification notification = UserNotification.createUserNotification(
                user,
                schedule,
                fcmMessageRequestDto.title(),
                fcmMessageRequestDto.body(),
                now()
        );
        notificationRepository.save(notification);
        log.info("{ NotificationService } : notification 생성 성공");
        return NotificationResponseDto.fromNotification(notification);
//            } catch (FirebaseMessagingException e) {
//                e.printStackTrace();
//                throw BaseException.type(NotificationErrorCode.FIREBASE_FAILED);
//            }
//        }
//        else{
//            throw BaseException.type(NotificationErrorCode.FIREBASE_INVALID_TOKEN);
//        }
    }
}
