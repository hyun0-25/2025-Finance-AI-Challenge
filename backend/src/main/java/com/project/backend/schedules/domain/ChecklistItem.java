package com.project.backend.schedules.domain;

import com.project.backend.global.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "checklistItem")
public class ChecklistItem extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long checklistItemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;

    @Column(nullable = false)
    private String checklistItemName;

    @Column(nullable = false)
    private Boolean checklistItemIsChecked;

    private ChecklistItem(Schedule schedule, String checklistItemName, Boolean checklistItemIsChecked) {
        this.schedule = schedule;
        this.checklistItemName = checklistItemName;
        this.checklistItemIsChecked = checklistItemIsChecked;
    }

    public static ChecklistItem createChecklist(Schedule schedule, String checklistItemName, Boolean checklistItemIsChecked) {
        return new ChecklistItem(schedule, checklistItemName, checklistItemIsChecked);
    }
}
