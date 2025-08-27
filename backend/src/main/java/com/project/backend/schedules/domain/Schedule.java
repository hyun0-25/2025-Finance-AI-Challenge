package com.project.backend.schedules.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="schedule")
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scheduleId;

    @Column(nullable = false)
    private LocalDateTime scheduleDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ScheduleFrequencyType scheduleFrequency;

    @Column(nullable = false)
    private LocalDateTime scheduleStartDate;

    @Column(nullable = false)
    private LocalDateTime scheduleEndDate;

    @Column(nullable = false)
    private String scheduleName;

    @Column(nullable = false)
    private String scheduleColor;

    @Column(nullable = false)
    private Boolean scheduleIsChecklist;

    private Schedule(LocalDateTime scheduleDate, ScheduleFrequencyType scheduleFrequency, LocalDateTime scheduleStartDate, LocalDateTime scheduleEndDate, String scheduleName, String scheduleColor, Boolean scheduleIsChecklist) {
        this.scheduleDate = scheduleDate;
        this.scheduleFrequency = scheduleFrequency;
        this.scheduleStartDate = scheduleStartDate;
        this.scheduleEndDate = scheduleEndDate;
        this.scheduleName = scheduleName;
        this.scheduleColor = scheduleColor;
        this.scheduleIsChecklist = scheduleIsChecklist;
    }

    public static Schedule createSchedule(LocalDateTime scheduleDate, ScheduleFrequencyType scheduleFrequency, LocalDateTime scheduleStartDate, LocalDateTime scheduleEndDate, String scheduleName, String scheduleColor, Boolean scheduleIsChecklist) {
        return new Schedule(scheduleDate, scheduleFrequency, scheduleStartDate, scheduleEndDate, scheduleName, scheduleColor, scheduleIsChecklist);
    }
}