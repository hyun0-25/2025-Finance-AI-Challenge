package com.project.backend.cards.dto.response;

import java.util.List;

public record CardRecommendResponseDto(
        List<CardRecommendListResponseDto> userCardRecommend,
        List<CardRecommendListResponseDto> newCardRecommend
) {
}
