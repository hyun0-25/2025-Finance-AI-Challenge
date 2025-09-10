package com.project.backend.cards.domain;

public enum BenefitFrequencyType {
    DAILY("일"),
    WEEKLY("주"),
    MONTHLY("월"),
    QUARTERLY("분기"),
    YEARLY("년");


    private final String description;

    BenefitFrequencyType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
