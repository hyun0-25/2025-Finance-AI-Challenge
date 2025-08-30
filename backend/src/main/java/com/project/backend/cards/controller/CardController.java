package com.project.backend.cards.controller;

import com.project.backend.cards.dto.request.UserCardRequestDto;
import com.project.backend.cards.dto.response.UserCardResponseDto;
import com.project.backend.cards.service.UserCardService;
import com.project.backend.schedules.dto.request.ScheduleRequestDto;
import com.project.backend.schedules.dto.response.ScheduleResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/cards")
public class CardController {
    private final UserCardService userCardService;

    @PostMapping
    public ResponseEntity<UserCardResponseDto> createUserCard(@RequestBody UserCardRequestDto userCardRequestDto) {
        log.info("{ CardController } : UserCard 생성 진입");
        UserCardResponseDto userCardResponseDto = userCardService.createUserCard(userCardRequestDto);
        log.info("{ CardController } : UserCard 생성 성공");

        return ResponseEntity.status(HttpStatus.CREATED).body(userCardResponseDto);
    }

    @GetMapping
    public ResponseEntity<List<UserCardResponseDto>> getUserCards() {
        log.info("{ CardController } : UserCardList 조회 진입");
        List<UserCardResponseDto> userCardResponseDtoList = userCardService.getUserCards();
        log.info("{ CardController } : UserCardList 조회 성공");
        return ResponseEntity.ok(userCardResponseDtoList);
    }

}
