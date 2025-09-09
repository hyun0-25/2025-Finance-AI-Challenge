package com.project.backend.notifications.domain;

import com.project.backend.global.BaseEntity;
import com.project.backend.schedules.domain.Schedule;
import com.project.backend.users.domain.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "notification")
public class UserNotification extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long notificationId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;

    @Column(nullable = false)
    private String notificationTitle;

    @Column(nullable = false)
    private String notificationBody;

    @Column(nullable = false)
    private LocalDateTime notificationSendDate;

    private UserNotification(User user, Schedule schedule, String notificationTitle, String notificationBody, LocalDateTime notificationSendDate) {
        this.user = user;
        this.schedule = schedule;
        this.notificationTitle = notificationTitle;
        this.notificationBody = notificationBody;
        this.notificationSendDate = notificationSendDate;
    }

    public static UserNotification createUserNotification(User user, Schedule schedule, String notificationTitle, String notificationBody, LocalDateTime notificationSendDate) {
        return new UserNotification(user, schedule, notificationTitle, notificationBody, notificationSendDate);
    }
}