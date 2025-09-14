package com.project.backend.schedules.dto.response;

import com.project.backend.cards.domain.BenefitCategory;
import com.project.backend.schedules.domain.ChecklistItem;
import lombok.Builder;

@Builder
public record ChecklistItemResponseDto(
        Long checklistItemId,
        BenefitCategory checklistItemCategory,
        String checklistItemContent,
        Boolean checklistItemIsChecked
) {
    public static ChecklistItemResponseDto fromChecklistItem(ChecklistItem checklistItem) {
        return ChecklistItemResponseDto.builder()
                .checklistItemId(checklistItem.getChecklistItemId())
                .checklistItemContent(checklistItem.getChecklistItemContent())
                .checklistItemCategory(checklistItem.getChecklistItemCategory())
                .checklistItemIsChecked(checklistItem.getChecklistItemIsChecked())
                .build();
    }
}
