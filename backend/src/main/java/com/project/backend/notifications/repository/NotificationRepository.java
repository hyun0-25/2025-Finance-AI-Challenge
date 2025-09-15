package com.project.backend.notifications.repository;

import com.project.backend.notifications.domain.UserNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface NotificationRepository extends JpaRepository<UserNotification, Long> {

    @Query("SELECT n FROM UserNotification n WHERE n.user.userId = :user_id AND n.isDeleted = false ORDER BY n.notificationSendDate DESC ")
    List<UserNotification> findByUserUUIDAndIsDeletedOrderByNotificationSendDateDesc(@Param("user_id") UUID userId);
}