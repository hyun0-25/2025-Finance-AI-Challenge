package com.project.backend.schedules.repository;

import com.project.backend.schedules.domain.Schedule;
import com.project.backend.users.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {

    @Query("SELECT s FROM Schedule s WHERE s.scheduleId = :id AND s.isDeleted = false")
    Schedule findScheduleByScheduleIdAndIsDeleted(@Param("id") Long id);

    @Query("SELECT s FROM Schedule s " +
            "WHERE s.user.userId = :userId " +
            "AND ((s.scheduleFrequency = 'NONE' AND s.scheduleStartDate >= :start AND s.scheduleStartDate <= :end)" +
            "OR (s.scheduleRepeatStartDate <= :end AND s.scheduleRepeatEndDate >= :start)) " +
            "AND s.isDeleted = false")
    List<Schedule> findScheduleByUserIdAndDate(@Param("userId") UUID userId, @Param("start") LocalDateTime start, @Param("end") LocalDateTime end);

    @Query("SELECT s FROM Schedule s " +
            "WHERE s.user.userId = :userId " +
            "AND ((s.scheduleFrequency = 'NONE' AND FUNCTION('DATE', s.scheduleStartDate) = :start)" +
            "OR FUNCTION('DATE', s.scheduleRepeatEndDate) >= :start) " +
            "AND s.isDeleted = false")
    List<Schedule> findScheduleByUserIdAndStartDate(@Param("userId") UUID userId, @Param("start") LocalDate start);
}
