package com.project.backend.cards.domain;

import com.project.backend.global.BaseEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "card")
public class Card extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cardId;

    @OneToMany(mappedBy = "card", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Benefit> benefit = new ArrayList<>();

    @Column(nullable = false)
    private String cardName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CardCategory cardCategory;

    private Integer cardBenefitLimit;

    private Integer cardAnnualFee;

    private Card(List<Benefit> benefit, String cardName, CardCategory cardCategory, Integer cardBenefitLimit, Integer cardAnnualFee) {
        this.benefit = benefit;
        this.cardName = cardName;
        this.cardCategory = cardCategory;
        this.cardBenefitLimit = cardBenefitLimit;
        this.cardAnnualFee = cardAnnualFee;
    }
}