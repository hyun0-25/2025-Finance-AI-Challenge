package com.project.backend.cards.repository;

import com.project.backend.cards.domain.Card;
import com.project.backend.cards.domain.CardRecommend;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CardRecommendRepository  extends JpaRepository<CardRecommend, Long> {
    @Query("SELECT c FROM CardRecommend c WHERE c.schedule.scheduleId = :id AND c.isDeleted = false")
    List<CardRecommend> findByScheduleIdAndIsDeleted(@Param("id") Long scheduleId);
}
