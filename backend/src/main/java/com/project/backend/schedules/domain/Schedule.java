package com.project.backend.schedules.domain;

import com.project.backend.cards.domain.Card;
import com.project.backend.global.BaseEntity;
import com.project.backend.users.domain.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "schedule")
public class Schedule extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long scheduleId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private LocalDateTime scheduleStartDate;

    @Column(nullable = false)
    private LocalDateTime scheduleEndDate;


    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ScheduleFrequencyType scheduleFrequency;

    private LocalDateTime scheduleRepeatStartDate;

    private LocalDateTime scheduleRepeatEndDate;

    @Column(nullable = false)
    private String scheduleName;

    @Column(nullable = false)
    private String scheduleColor;

    @Column(nullable = false)
    private Boolean scheduleIsChecklist;

    private Schedule(User user, LocalDateTime scheduleStartDate, LocalDateTime scheduleEndDate, ScheduleFrequencyType scheduleFrequency, LocalDateTime scheduleRepeatStartDate, LocalDateTime scheduleRepeatEndDate, String scheduleName, String scheduleColor, Boolean scheduleIsChecklist) {
        this.user = user;
        this.scheduleStartDate = scheduleStartDate;
        this.scheduleEndDate = scheduleEndDate;
        this.scheduleFrequency = scheduleFrequency;
        this.scheduleRepeatStartDate = scheduleRepeatStartDate;
        this.scheduleRepeatEndDate = scheduleRepeatEndDate;
        this.scheduleName = scheduleName;
        this.scheduleColor = scheduleColor;
        this.scheduleIsChecklist = scheduleIsChecklist;
    }

    public static Schedule createSchedule(User user, LocalDateTime scheduleStartDate, LocalDateTime scheduleEndDate, ScheduleFrequencyType scheduleFrequency, LocalDateTime scheduleRepeatStartDate, LocalDateTime scheduleRepeatEndDate, String scheduleName, String scheduleColor, Boolean scheduleIsChecklist) {
        return new Schedule(user, scheduleStartDate, scheduleEndDate, scheduleFrequency, scheduleRepeatStartDate, scheduleRepeatEndDate, scheduleName, scheduleColor, scheduleIsChecklist);
    }
}