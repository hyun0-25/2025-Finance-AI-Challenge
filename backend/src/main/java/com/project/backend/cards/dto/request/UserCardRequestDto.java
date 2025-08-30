package com.project.backend.cards.dto.request;

import java.time.LocalDateTime;

public record UserCardRequestDto(
        Long cardId,
        String userCardNumber,
        LocalDateTime userCardSettlementDate
) {
}
