package com.project.backend.transactions.domain;

public enum TransactionAffiliateBusinessType {
    RESTAURANT("음식점"),
    ONLINE_SHOPPING("온라인쇼핑"),
    CULTURE_LEISURE("문화·여가"),
    TRANSPORTATION("교통"),
    TELECOMMUNICATION("통신"),
    CONVENIENCE_STORE("편의점"),
    MART_DISCOUNT("마트·할인매장"),
    CLOTHING_ACCESSORY("의류·악세서리"),
    CAFE_BAKERY("카페·베이커리"),
    OTHERS("기타"),
    HOUSEHOLD_FURNITURE("생활·가전가구"),
    HOSPITAL_PHARMACY("병원·약국"),
    BEAUTY_HEALTH("뷰티·건강"),
    DEPARTMENT_STORE("백화점"),
    TRAVEL("여행"),
    AUTOMOBILE_FUEL("자동차·주유"),
    EDUCATION_ACADEMY("교육·학원"),
    OVERSEAS_PURCHASE("해외이용·직구"),
    UTILITY_MAINTENANCE("관리비·공과금"),
    PETS("반려동물");

    private final String description;

    TransactionAffiliateBusinessType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

}
