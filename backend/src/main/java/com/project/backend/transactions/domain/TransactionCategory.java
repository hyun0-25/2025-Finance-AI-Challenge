package com.project.backend.transactions.domain;

public enum TransactionCategory {
    FOOD("식비"),
    CAFE_SNACK("카페·간식"),
    CONVENIENCE_MART_MISC("편의점·마트·잡화"),
    ALCOHOL_ENTERTAINMENT("술·유흥"),
    SHOPPING("쇼핑"),
    HOBBY_LEISURE("취미·여가"),
    MEDICAL_HEALTH_FITNESS("의료·건강·피트니스"),
    HOUSING_COMMUNICATION("주거·통신"),
    INSURANCE_TAX_FINANCE("보험·세금·기타금융"),
    BEAUTY("미용"),
    TRANSPORT_AUTOMOBILE("교통·자동차"),
    TRAVEL_ACCOMMODATION("여행·숙박"),
    EDUCATION("교육"),
    LIVING("생활"),
    DONATION_SPONSOR("기부·후원"),
    UNCATEGORIZED("카테고리 없음"),
    ATM_WITHDRAWAL("ATM출금"),
    TRANSFER("이체"),
    SALARY("급여"),
    CARD_PAYMENT("카드대금"),
    SAVINGS_INVESTMENT("저축·투자"),
    DEFERRED_PAYMENT("후불결제대금");

    private final String description;

    TransactionCategory(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

}
