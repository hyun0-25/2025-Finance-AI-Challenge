package com.project.backend.cards.dto.response;

import com.project.backend.cards.domain.Card;
import com.project.backend.cards.domain.CardCategory;
import lombok.Builder;

import java.util.List;

@Builder
public record CardResponseDto(
        Long cardId,
        String cardName,
        String cardCategory,
//        Integer cardBenefitLimit,
        Integer cardAnnualFeeDomestic,
        Integer cardAnnualFeeInternational,
        List<BenefitListResponseDto> benefitListResponseDtoList
) {
    public static CardResponseDto fromCard(Card card, List<BenefitListResponseDto> benefitListResponseDtoList) {
        return CardResponseDto.builder()
                .cardId(card.getCardId())
                .cardName(card.getCardName())
                .cardCategory(card.getCardCategory().getDescription())
                .cardAnnualFeeDomestic(card.getCardAnnualFeeDomestic())
                .cardAnnualFeeInternational(card.getCardAnnualFeeInternational())
                .benefitListResponseDtoList(benefitListResponseDtoList)
                .build();
    }
}
