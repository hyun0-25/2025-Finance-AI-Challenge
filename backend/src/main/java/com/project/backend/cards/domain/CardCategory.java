package com.project.backend.cards.domain;

public enum CardCategory {
    CHECK("체크카드"),
    CREDIT("신용카드");

    private final String description;

    CardCategory(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
