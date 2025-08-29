package com.project.backend.schedules.repository;

import com.project.backend.schedules.domain.Schedule;
import com.project.backend.users.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    @Query("SELECT s FROM Schedule s WHERE s.scheduleId = :id AND s.isDeleted = false")
    Schedule findScheduleByScheduleIdAndIsDeleted(@Param("id") Long id);
}
