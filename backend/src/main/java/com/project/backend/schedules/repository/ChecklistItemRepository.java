package com.project.backend.schedules.repository;

import com.project.backend.schedules.domain.ChecklistItem;
import com.project.backend.schedules.domain.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChecklistItemRepository extends JpaRepository<ChecklistItem, Long> {
    @Query("SELECT c FROM ChecklistItem c WHERE c.schedule.scheduleId = :schedule_id AND c.checklistItemId = :checklist_item_id AND c.isDeleted = false")
    ChecklistItem findChecklistItemByScheduleIdAndChecklistItemIdAndIsDeleted(@Param("schedule_id") Long scheduleId, @Param("checklist_item_id") Long checklistItemId);
}
