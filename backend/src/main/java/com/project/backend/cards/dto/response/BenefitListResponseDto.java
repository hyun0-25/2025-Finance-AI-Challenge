package com.project.backend.cards.dto.response;

import com.project.backend.cards.domain.Benefit;
import com.project.backend.cards.domain.BenefitType;
import lombok.Builder;

@Builder
public record BenefitListResponseDto(
        String benefitCategoryAndBenefitInfo,
        String benefitContent
) {
    public static BenefitListResponseDto fromBenefitList(Benefit benefit) {
        StringBuilder info = new StringBuilder();
        info.append(benefit.getBenefitCategory().getDescription());
        if (benefit.getBenefitType().name().contains("DISCOUNT")) { //할인 유형
            info.append(" 할인 ");
        } else {
            info.append(" ").append(benefit.getBenefitType().getDescription()).append(" ");
        }

        if (benefit.getBenefitPercent() != null) {
            info.append(formatDouble(benefit.getBenefitPercent())).append("%");
        } else if (benefit.getBenefitTimes() != null) {
            info.append(benefit.getBenefitTimes()).append("회");
        } else if (benefit.getBenefitAmountLimit() != null) {
            info.append("최대 ").append(benefit.getBenefitAmountLimit()).append("원");
        } else {
            info.append("(한도없음)");
        }

        return BenefitListResponseDto.builder()
                .benefitCategoryAndBenefitInfo(info.toString())
                .benefitContent(benefit.getBenefitContent())
                .build();
    }

    public static String formatDouble(double value) {
        if (value == (long) value) {
            return String.format("%d", (long) value);
        } else {
            return String.valueOf(value);
        }
    }
}
