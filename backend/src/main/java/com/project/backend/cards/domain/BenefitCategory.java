package com.project.backend.cards.domain;

public enum BenefitCategory {
    ALL_MERCHANTS("모든가맹점"),
    TRANSPORTATION("교통"),
    FUEL("주유"),
    TELEPHONE_CHARGE("통신"),
    MART_CONVENIENCE_STORE("마트/편의점"),
    ONLINE_SHOPPING("온라인쇼핑"),
    SHOPPING("쇼핑"),
    FOOD("푸드"),
    CAFE_DESSERT("카페/디저트"),
    BEAUTY_FITNESS("뷰티/피트니스"),
    NO_SPENDING_REQUIREMENT("무실적"),
    UTILITY_BILLS_RENTAL("공과금/렌탈"),
    HOSPITAL_PHARMACY("병원/약국"),
    PETS("애완동물"),
    EDUCATION_CHILDCARE("교육/육아"),
    AUTOMOBILE_HI_PASS("자동차/하이패스"),
    LEISURE_SPORTS("레저/스포츠"),
    DIGITAL_SUBSCRIPTION("디지털구독"),
    MOVIES_CULTURE("영화/문화"),
    EASY_PAYMENT("간편결제"),
    AIRLINE_MILEAGE("항공마일리지"),
    AIRPORT_LOUNGE_PRIORITY_PASS("공항라운지/PP"),
    PREMIUM("프리미엄"),
    RAVEL_ACCOMMODATION("여행/숙박"),
    OVERSEAS("해외"),
    BUSINESS("비즈니스"),
    ETC("이외");


    private final String description;

    BenefitCategory(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
