package com.project.backend.cards.repository;

import com.project.backend.cards.domain.Card;
import com.project.backend.cards.domain.UserCard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;


public interface UserCardRepository extends JpaRepository<UserCard, Long> {

    @Query("SELECT uc FROM UserCard uc WHERE uc.user.userId = :user_id AND uc.card.cardId = :card_id AND uc.isDeleted = false")
    UserCard findByUserIdAndCardIdAndIsDeleted(@Param("user_id") UUID userId, @Param("card_id") Long cardId);


}
