package com.project.backend.cards.dto.request;

import java.util.UUID;

public record CardRecommendRequestDto(
        Long scheduleId,
        UUID userUUID
) {
}
