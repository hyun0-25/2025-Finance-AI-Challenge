package com.project.backend.schedules.controller;

import com.project.backend.cards.dto.response.CardRecommendResponseDto;
import com.project.backend.cards.service.CardService;
import com.project.backend.schedules.domain.ChecklistItem;
import com.project.backend.schedules.dto.request.ChecklistItemIsCheckedRequestDto;
import com.project.backend.schedules.dto.request.ChecklistItemRequestDto;
import com.project.backend.schedules.dto.request.ScheduleSettingRequestDto;
import com.project.backend.schedules.dto.request.ScheduleRequestDto;
import com.project.backend.schedules.dto.response.ChecklistItemResponseDto;
import com.project.backend.schedules.dto.response.ScheduleResponseDto;
import com.project.backend.schedules.service.ChecklistItemService;
import com.project.backend.schedules.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/schedules")
public class ScheduleController {
    private final ScheduleService scheduleService;
    private final CardService cardService;
    private final ChecklistItemService checklistItemService;

    @PostMapping
    public ResponseEntity<ScheduleResponseDto> createSchedule(@RequestBody ScheduleRequestDto scheduleRequestDto) {
        log.info("{ ScheduleController } : Schedule 생성 진입");
        ScheduleResponseDto scheduleResponseDto = scheduleService.createSchedule(scheduleRequestDto);
        log.info("{ ScheduleController } : Schedule 생성 성공");

        return ResponseEntity.status(HttpStatus.CREATED).body(scheduleResponseDto);
    }

    @GetMapping("/{scheduleId}")
    public ResponseEntity<ScheduleResponseDto> getSchedule(@PathVariable Long scheduleId) {
        log.info("{ ScheduleController } : Schedule 조회 진입");
        log.info(" >> ScheduleId : " + scheduleId);
        ScheduleResponseDto scheduleResponseDto = scheduleService.getSchedule(scheduleId);
        log.info("{ ScheduleController } : Schedule 조회 성공");
        return ResponseEntity.ok(scheduleResponseDto);
    }

    @PutMapping("/{scheduleId}")
    public ResponseEntity<ScheduleResponseDto> deleteSchedule(@PathVariable Long scheduleId) {
        log.info("{ ScheduleController } : Schedule 삭제 진입");
        log.info(" >> ScheduleId : " + scheduleId);
        scheduleService.deleteSchedule(scheduleId);
        log.info("{ ScheduleController } : Schedule 삭제 성공");
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{scheduleId}/on-off")
    public ResponseEntity<ScheduleResponseDto> updateScheduleSetting(
            @PathVariable Long scheduleId,
            @RequestBody ScheduleSettingRequestDto scheduleSettingRequestDto
    ) {
        log.info("{ ScheduleController } : Schedule ON/OFF 세팅변경 진입");
        log.info(" >> ScheduleId : " + scheduleId);
        scheduleService.updateScheduleSetting(scheduleId, scheduleSettingRequestDto);
        log.info("{ ScheduleController } : Schedule ON/OFF 세팅변경 성공");
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{scheduleId}/checklist")
    public ResponseEntity<ChecklistItemResponseDto> createChecklistItem(
            @PathVariable Long scheduleId,
            @RequestBody ChecklistItemRequestDto checklistItemRequestDto) {
        log.info("{ ScheduleController } : ChecklistItem 생성 진입");
        ChecklistItemResponseDto checklistItemResponseDto = checklistItemService.createChecklistItem(scheduleId, checklistItemRequestDto);
        log.info("{ ScheduleController } : ChecklistItem 생성 성공");
        return ResponseEntity.status(HttpStatus.CREATED).body(checklistItemResponseDto);
    }

    @PutMapping("/{scheduleId}/checklist/{checklistItemId}")
    public ResponseEntity<ChecklistItemResponseDto> deleteChecklistItem(
            @PathVariable Long scheduleId,
            @PathVariable Long checklistItemId
    ) {
        log.info("{ ScheduleController } : ChecklistItem 삭제 진입");
        log.info(" >> ScheduleId : " + scheduleId);
        log.info(" >> ChecklistItemId : " + checklistItemId);
        checklistItemService.deleteChecklistItem(scheduleId, checklistItemId);
        log.info("{ ScheduleController } : ChecklistItem 삭제 성공");
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{scheduleId}/checklist/{checklistItemId}/on-off")
    public ResponseEntity<ChecklistItemResponseDto> updateChecklistItemIsChecked(
            @PathVariable Long scheduleId,
            @PathVariable Long checklistItemId,
            @RequestBody ChecklistItemIsCheckedRequestDto checklistItemIsCheckedRequestDto
    ) {
        log.info("{ ScheduleController } : ChecklistItem IsChecked 변경 진입");
        log.info(" >> ScheduleId : " + scheduleId);
        log.info(" >> ChecklistItemId : " + checklistItemId);
        checklistItemService.updateChecklistItemIsChecked(scheduleId, checklistItemId, checklistItemIsCheckedRequestDto);
        log.info("{ ScheduleController } : ChecklistItem IsChecked 변경 성공");
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{scheduleId}/recommend")
    public ResponseEntity<CardRecommendResponseDto> createCardRecommend(@PathVariable Long scheduleId) {
        log.info("{ ScheduleController } : CardRecommend 생성 진입");
        CardRecommendResponseDto cardRecommendResponseDto = cardService.createCardRecommend(scheduleId);
        log.info("{ ScheduleController } : CardRecommend 생성 성공");
        return ResponseEntity.status(HttpStatus.CREATED).body(cardRecommendResponseDto);
    }
}
