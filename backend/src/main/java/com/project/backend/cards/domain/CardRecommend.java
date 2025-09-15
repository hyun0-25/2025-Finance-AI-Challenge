package com.project.backend.cards.domain;

import com.project.backend.global.BaseEntity;
import com.project.backend.schedules.domain.Schedule;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "card_recommend")
public class CardRecommend extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cardRecommendId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;

    @Column(nullable = false)
    private Long cardId;

    @Column(nullable = false)
    private String recommendContent;

    private CardRecommend(Schedule schedule, Long cardId, String recommendContent) {
        this.schedule = schedule;
        this.cardId = cardId;
        this.recommendContent = recommendContent;
    }

    public static CardRecommend createCardRecommend(Schedule schedule, Long cardId, String recommendContent) {
        return new CardRecommend(schedule, cardId, recommendContent);
    }
}
