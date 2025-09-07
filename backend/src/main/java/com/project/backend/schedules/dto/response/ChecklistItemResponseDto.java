package com.project.backend.schedules.dto.response;

import com.project.backend.schedules.domain.ChecklistItem;
import lombok.Builder;

@Builder
public record ChecklistItemResponseDto(
        Long checklistItemId,
        String checklistItemName,
        Boolean checklistItemIsChecked
) {
    public static ChecklistItemResponseDto fromChecklistItem(ChecklistItem checklistItem) {
        return ChecklistItemResponseDto.builder()
                .checklistItemId(checklistItem.getChecklistItemId())
                .checklistItemName(checklistItem.getChecklistItemName())
                .checklistItemIsChecked(checklistItem.getChecklistItemIsChecked())
                .build();
    }
}
