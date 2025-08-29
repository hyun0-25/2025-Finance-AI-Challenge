package com.project.backend.cards.domain;

public enum BenefitFrequencyType {
    WEEKLY("주"),
    MONTHLY("월"),
    YEARLY("년");


    private final String description;

    BenefitFrequencyType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
