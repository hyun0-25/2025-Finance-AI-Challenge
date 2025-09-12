package com.project.backend.transactions.domain;

import com.project.backend.cards.domain.UserCard;
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
@Table(name = "transaction")
public class Transaction extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long transactionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_card_id")
    private UserCard userCard;

    @Column(nullable = false)
    private String transactionAffiliateName;

    @Enumerated(EnumType.STRING)
    private TransactionAffiliateBusinessType transactionAffiliateBusinessType;

    @Enumerated(EnumType.STRING)
    private TransactionCategory transactionCategory;

    @Column(nullable = false)
    private Integer transactionAmount;

    @Column(nullable = false)
    private LocalDateTime transactionDate;

}
