package com.project.backend.cards.service;

import com.project.backend.cards.domain.Benefit;
import com.project.backend.cards.domain.Card;
import com.project.backend.cards.dto.response.BenefitListResponseDto;
import com.project.backend.cards.dto.response.CardResponseDto;
import com.project.backend.cards.exception.CardErrorCode;
import com.project.backend.cards.repository.CardRepository;
import com.project.backend.global.exception.BaseException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CardService {
    private final CardRepository cardRepository;

    public CardResponseDto getCard(Long cardId) {
        log.info("{ CardService } : card 조회");
        Card card = cardRepository.findByIdAndIsDeleted(cardId);
        if (card == null)
            throw BaseException.type(CardErrorCode.CARD_NOT_FOUND);

        List<Benefit> benefitList = card.getBenefit().stream()
                .collect(Collectors.collectingAndThen(
                        Collectors.toMap(
                                b -> b.getBenefitCategory() + "_" + b.getBenefitContent(), //key
                                b -> b,                                     //value
                                (b1, b2) -> b2                              //같은 키 존재시 뒤의 값 유지
                        ),
                        map -> new ArrayList<>(map.values())
                ));
        List<BenefitListResponseDto> benefitListResponseDtos = new ArrayList<>();
        for (Benefit b : benefitList) {
            benefitListResponseDtos.add(BenefitListResponseDto.fromBenefitList(b));
        }
        log.info("{ CardService } : card 조회 성공");
        return CardResponseDto.fromCard(card, benefitListResponseDtos);
    }
}
