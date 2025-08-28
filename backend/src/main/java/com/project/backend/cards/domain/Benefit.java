package com.project.backend.cards.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "benefit")
public class Benefit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long benefitId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id")
    private Card card;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private BenefitCategory benefitCategory;

    private Integer benefitPercent;

    private Integer benefitAmountLimit;

    private Integer benefitAmount;

    private Integer benefitTimes;

    @Enumerated(EnumType.STRING)
    private BenefitType benefitType;

    @Enumerated(EnumType.STRING)
    private BenefitFrequencyType benefitFrequencyType;

    private Integer benefitMinAmount;

    private Integer benefitMaxAmount;

    private Benefit(Card card, BenefitCategory benefitCategory, Integer benefitPercent, Integer benefitAmountLimit, Integer benefitAmount, Integer benefitTimes, BenefitType benefitType, BenefitFrequencyType benefitFrequencyType, Integer benefitMinAmount, Integer benefitMaxAmount) {
        this.card = card;
        this.benefitCategory = benefitCategory;
        this.benefitPercent = benefitPercent;
        this.benefitAmountLimit = benefitAmountLimit;
        this.benefitAmount = benefitAmount;
        this.benefitTimes = benefitTimes;
        this.benefitType = benefitType;
        this.benefitFrequencyType = benefitFrequencyType;
        this.benefitMinAmount = benefitMinAmount;
        this.benefitMaxAmount = benefitMaxAmount;
    }
}
