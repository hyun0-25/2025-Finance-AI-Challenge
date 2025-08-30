package com.project.backend.cards.service;

import com.project.backend.cards.domain.Card;
import com.project.backend.cards.domain.UserCard;
import com.project.backend.cards.dto.request.UserCardRequestDto;
import com.project.backend.cards.dto.response.UserCardResponseDto;
import com.project.backend.cards.exception.CardErrorCode;
import com.project.backend.cards.repository.CardRepository;
import com.project.backend.cards.repository.UserCardRepository;
import com.project.backend.global.exception.BaseException;
import com.project.backend.schedules.dto.request.ScheduleRequestDto;
import com.project.backend.schedules.dto.response.ScheduleResponseDto;
import com.project.backend.users.domain.User;
import com.project.backend.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserCardService {
    @Value("${TEST_USER_UUID}")
    private UUID userId;
    private final UserRepository userRepository;
    private final CardRepository cardRepository;
    private final UserCardRepository userCardRepository;

    public UserCardResponseDto createUserCard(UserCardRequestDto userCardRequestDto) {
        log.info("{ UserCardService } : userCard 생성");
        User user = userRepository.findByUUIDAnAndIsDeleted(userId);
        Card card = cardRepository.findByIdAnAndIsDeleted(userCardRequestDto.cardId());
        if (card == null)
            throw BaseException.type(CardErrorCode.CARD_NOT_FOUND);
        validateAlreadyUserCard(user.getUserId(), card.getCardId());

        UserCard userCard = UserCard.createUserCard(
                user,
                card,
                userCardRequestDto.userCardNumber(),
                userCardRequestDto.userCardSettlementDate()
        );
        userCardRepository.save(userCard);
        log.info("{ UserCardService } : userCard  성공");
        return UserCardResponseDto.fromUserCard(userCard);
    }

    private void validateAlreadyUserCard(UUID userId, Long cardId) {
        UserCard userCard = userCardRepository.findByUserIdAndCardIdAndIsDeleted(userId, cardId);
        if (userCard != null)
            throw BaseException.type(CardErrorCode.ALREADY_USER_CARD);
    }
}
