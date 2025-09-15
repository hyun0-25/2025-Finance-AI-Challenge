package com.project.backend.cards.service;

import com.project.backend.cards.domain.Benefit;
import com.project.backend.cards.domain.Card;
import com.project.backend.cards.domain.CardRecommend;
import com.project.backend.cards.dto.request.CardRecommendRequestDto;
import com.project.backend.cards.dto.response.BenefitListResponseDto;
import com.project.backend.cards.dto.response.CardRecommendListResponseDto;
import com.project.backend.cards.dto.response.CardRecommendResponseDto;
import com.project.backend.cards.dto.response.CardResponseDto;
import com.project.backend.cards.exception.CardErrorCode;
import com.project.backend.cards.repository.CardRecommendRepository;
import com.project.backend.cards.repository.CardRepository;
import com.project.backend.global.exception.BaseException;
import com.project.backend.schedules.domain.Schedule;
import com.project.backend.schedules.dto.request.ScheduleNameReqeustDto;
import com.project.backend.schedules.dto.response.ChecklistResponseDto;
import com.project.backend.schedules.exception.ScheduleErrorCode;
import com.project.backend.schedules.repository.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.sql.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class CardService {
    @Value("${FASTAPI_SERVER_URL}")
    private String fastApiServerURL;
    @Value("${TEST_USER_UUID}")
    private UUID userId;
    private final CardRepository cardRepository;
    private final ScheduleRepository scheduleRepository;
    private final CardRecommendRepository cardRecommendRepository;

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

    public CardRecommendResponseDto createCardRecommend(Long scheduleId) {
        log.info("{ CardService } : cardRecommend 생성");
        Schedule schedule = scheduleRepository.findScheduleByScheduleIdAndIsDeleted(scheduleId);
        if (schedule == null)
            throw BaseException.type(ScheduleErrorCode.SCHEDULE_NOT_FOUND);

        List<CardRecommend> cardRecommendList = cardRecommendRepository.findByScheduleIdAndIsDeleted(scheduleId);
        // 기존 추천내역 삭제
        for (CardRecommend cardRecommend : cardRecommendList) {
            cardRecommend.softDelete();
        }

        RestTemplate restTemplate = new RestTemplate();
        String url = fastApiServerURL + "/card-recommend";
        CardRecommendRequestDto cardRecommendRequestDto = new CardRecommendRequestDto(scheduleId, userId);
        CardRecommendResponseDto cardRecommendResponseDto = restTemplate.postForObject(url, cardRecommendRequestDto, CardRecommendResponseDto.class);

        // 새 추천내역 생성
        List<CardRecommend> cardRecommends = new ArrayList<>();
        for (CardRecommendListResponseDto cardRecommendListResponseDto : cardRecommendResponseDto.newCardRecommend()) {
            CardRecommend cardRecommend = CardRecommend.createCardRecommend(
                    schedule,
                    cardRecommendListResponseDto.cardId(),
                    cardRecommendListResponseDto.recommendContent()
            );
            cardRecommends.add(cardRecommend);
        }
        cardRecommendRepository.saveAll(cardRecommends);

        log.info("{ CardService } : cardRecommend 생성 성공");
        return cardRecommendResponseDto;
    }
}
