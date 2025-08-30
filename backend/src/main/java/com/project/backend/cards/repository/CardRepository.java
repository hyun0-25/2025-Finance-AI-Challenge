package com.project.backend.cards.repository;

import com.project.backend.cards.domain.Card;
import com.project.backend.users.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface CardRepository extends JpaRepository<Card, Long> {
    @Query("SELECT c FROM Card c WHERE c.cardId = :id AND c.isDeleted = false")
    Card findByIdAnAndIsDeleted(@Param("id") Long id);
}
