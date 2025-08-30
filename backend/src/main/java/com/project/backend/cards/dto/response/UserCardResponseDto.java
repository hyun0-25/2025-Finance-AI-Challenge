package com.project.backend.cards.dto.response;

import com.project.backend.cards.domain.UserCard;
import lombok.Builder;

import java.time.LocalDateTime;
import java.util.UUID;

@Builder
public record UserCardResponseDto(
        Long userCardId,
        UUID userId,
        Long cardId,
        String userCardNumber,
        LocalDateTime userCardSettlementDate
) {
    public static UserCardResponseDto fromUserCard(UserCard userCard) {
        return UserCardResponseDto.builder()
                .userCardId(userCard.getUserCardId())
                .userId(userCard.getUser().getUserId())
                .cardId(userCard.getCard().getCardId())
                .userCardNumber(userCard.getUserCardNumber())
                .userCardSettlementDate(userCard.getUserCardSettlementDate())
                .build();
    }
}
