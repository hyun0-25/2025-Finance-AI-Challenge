package com.project.backend.schedules.dto.response;

import java.util.List;

public record ChecklistResponseDto(
        List<ChecklistItemResponseDto> checklist
) {
}
