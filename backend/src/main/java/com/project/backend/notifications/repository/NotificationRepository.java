package com.project.backend.notifications.repository;

import com.project.backend.notifications.domain.UserNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface NotificationRepository extends JpaRepository<UserNotification, Long> {
}