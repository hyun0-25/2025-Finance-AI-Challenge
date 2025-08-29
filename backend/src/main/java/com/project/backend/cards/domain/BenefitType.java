package com.project.backend.cards.domain;

public enum BenefitType {
    BILLING_DISCOUNT("청구할인"),
    ON_SITE_DISCOUNT("현장할인"),
    REFUND_DISCOUNT("환급할인"),
    POINT_ACCUMULATION("포인트적립"),
    MILEAGE_ACCUMULATION("마일리지 적립");

    private final String description;

    BenefitType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
