package com.project.backend.cards.domain;

import com.project.backend.global.BaseEntity;
import com.project.backend.users.domain.User;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "user_card")
public class UserCard extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userCardId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "card_id")
    private Card card;

    @Column(nullable = false)
    private String userCardNumber;

    @Column(nullable = false)
    private Boolean userCardIsInternational;

    @Column(nullable = false)
    private LocalDateTime userCardSettlementDate;

    public UserCard(User user, Card card, String userCardNumber, Boolean userCardIsInternational, LocalDateTime userCardSettlementDate) {
        this.user = user;
        this.card = card;
        this.userCardNumber = userCardNumber;
        this.userCardIsInternational = userCardIsInternational;
        this.userCardSettlementDate = userCardSettlementDate;
    }

    public static UserCard createUserCard(User user, Card card, String userCardNumber, Boolean userCardIsInternational, LocalDateTime userCardSettlementDate) {
        return new UserCard(user, card, userCardNumber, userCardIsInternational, userCardSettlementDate);
    }
}
