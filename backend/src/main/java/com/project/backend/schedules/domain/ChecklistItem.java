package com.project.backend.schedules.domain;

import com.project.backend.cards.domain.Benefit;
import com.project.backend.cards.domain.BenefitCategory;
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

    @Enumerated(EnumType.STRING)
    private BenefitCategory checklistItemCategory;

    @Column(nullable = false)
    private String checklistItemContent;

    @Column(nullable = false)
    private Boolean checklistItemIsChecked;

    private ChecklistItem(Schedule schedule, BenefitCategory checklistItemCategory, String checklistItemContent, Boolean checklistItemIsChecked) {
        this.schedule = schedule;
        this.checklistItemCategory = checklistItemCategory;
        this.checklistItemContent = checklistItemContent;
        this.checklistItemIsChecked = checklistItemIsChecked;
    }

    public static ChecklistItem createChecklistByAI(Schedule schedule, BenefitCategory checklistItemCategory, String checklistItemContent, Boolean checklistItemIsChecked) {
        return new ChecklistItem(schedule, checklistItemCategory, checklistItemContent, checklistItemIsChecked);
    }

    public static ChecklistItem createChecklistByUser(Schedule schedule, String checklistItemContent, Boolean checklistItemIsChecked) {
        return new ChecklistItem(schedule, null, checklistItemContent, checklistItemIsChecked);
    }

    public void updateIsChecked(boolean isChecked) {
        this.checklistItemIsChecked = isChecked;
    }
}
