package com.project.backend.schedules.service;

import com.project.backend.global.exception.BaseException;
import com.project.backend.schedules.domain.ChecklistItem;
import com.project.backend.schedules.domain.Schedule;
import com.project.backend.schedules.dto.request.ChecklistItemIsCheckedRequestDto;
import com.project.backend.schedules.dto.request.ChecklistItemRequestDto;
import com.project.backend.schedules.dto.request.ScheduleNameReqeustDto;
import com.project.backend.schedules.dto.request.ScheduleSettingRequestDto;
import com.project.backend.schedules.dto.response.ChecklistItemResponseDto;
import com.project.backend.schedules.dto.response.ChecklistResponseDto;
import com.project.backend.schedules.exception.ScheduleErrorCode;
import com.project.backend.schedules.repository.ChecklistItemRepository;
import com.project.backend.schedules.repository.ScheduleRepository;
import com.project.backend.users.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Check;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ChecklistItemService {
    @Value("${FASTAPI_SERVER_URL}")
    private String fastApiServerURL;
    private final ChecklistItemRepository checklistItemRepository;
    private final ScheduleRepository scheduleRepository;

    public ChecklistItemResponseDto createChecklistItem(Long scheduleId, ChecklistItemRequestDto checklistItemRequestDto) {
        log.info("{ ChecklistItemService } : checklistItem 생성");
        Schedule schedule = scheduleRepository.findScheduleByScheduleIdAndIsDeleted(scheduleId);
        if (schedule == null)
            throw BaseException.type(ScheduleErrorCode.SCHEDULE_NOT_FOUND);
        if (!schedule.getScheduleIsChecklist())
            throw BaseException.type(ScheduleErrorCode.SCHEDULE_CHECKLIST_INVALID);
        ChecklistItem checklistItem = ChecklistItem.createChecklistByUser(
                schedule,
                checklistItemRequestDto.checklistItemContent(),
                false
        );
        checklistItemRepository.save(checklistItem);
        log.info("{ ChecklistItemService } : checklistItem 생성 완료");
        return ChecklistItemResponseDto.fromChecklistItem(checklistItem);
    }

    public void deleteChecklistItem(Long scheduleId, Long checklistItemId) {
        log.info("{ ChecklistItemService } : checklistItem 삭제");
        ChecklistItem checklistItem = checklistItemRepository.findChecklistItemByScheduleIdAndChecklistItemIdAndIsDeleted(scheduleId, checklistItemId);
        if (checklistItem == null)
            throw BaseException.type(ScheduleErrorCode.CHECKLIST_NOT_FOUND);
        checklistItem.softDelete();
        log.info("{ ChecklistItemService } : checklistItem 삭제 성공");
    }

    public void updateChecklistItemIsChecked(Long scheduleId, Long checklistItemId, ChecklistItemIsCheckedRequestDto checklistItemIsCheckedRequestDto) {
        log.info("{ ChecklistItemService } : checklistItem isChecked 변경");
        ChecklistItem checklistItem = checklistItemRepository.findChecklistItemByScheduleIdAndChecklistItemIdAndIsDeleted(scheduleId, checklistItemId);
        if (checklistItem == null)
            throw BaseException.type(ScheduleErrorCode.CHECKLIST_NOT_FOUND);
        checklistItem.updateIsChecked(checklistItemIsCheckedRequestDto.isChecked());
        log.info("{ ChecklistItemService } : checklistItem isChecked 변경 성공");
    }

    public ChecklistResponseDto createAIChecklist(String scheduleName) {
        log.info("{ ChecklistItemService } : FastAPI 연동 - AI Checklist 생성");
        RestTemplate restTemplate = new RestTemplate();
        String url = fastApiServerURL + "/ai-checklist";
        ScheduleNameReqeustDto scheduleNameReqeustDto = new ScheduleNameReqeustDto(scheduleName);
        ChecklistResponseDto checklistResponseDto = restTemplate.postForObject(url, scheduleNameReqeustDto, ChecklistResponseDto.class);
        log.info("{ ChecklistItemService } : FastAPI 연동 - AI Checklist 생성 성공");
        return checklistResponseDto;
    }
}
