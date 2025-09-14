package com.project.backend.schedules.service;

import com.project.backend.global.exception.BaseException;
import com.project.backend.schedules.domain.ChecklistItem;
import com.project.backend.schedules.domain.Schedule;
import com.project.backend.schedules.dto.request.ChecklistItemRequestDto;
import com.project.backend.schedules.dto.request.ScheduleSettingRequestDto;
import com.project.backend.schedules.dto.request.ScheduleRequestDto;
import com.project.backend.schedules.dto.response.ChecklistItemResponseDto;
import com.project.backend.schedules.dto.response.ChecklistResponseDto;
import com.project.backend.schedules.dto.response.ScheduleResponseDto;
import com.project.backend.schedules.exception.ScheduleErrorCode;
import com.project.backend.schedules.repository.ChecklistItemRepository;
import com.project.backend.schedules.repository.ScheduleRepository;
import com.project.backend.users.domain.User;
import com.project.backend.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.Check;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ScheduleService {

    @Value("${TEST_USER_UUID}")
    private UUID userId;
    private final ScheduleRepository scheduleRepository;
    private final ChecklistItemRepository checklistItemRepository;
    private final UserRepository userRepository;
    private final ChecklistItemService checklistItemService;

    public ScheduleResponseDto createSchedule(ScheduleRequestDto scheduleRequestDto) {
        log.info("{ ScheduleService } : schedule 생성");
        User user = userRepository.findByUUIDAndIsDeleted(userId);
        Schedule schedule = Schedule.createSchedule(
                user,
                scheduleRequestDto.scheduleStartDate(),
                scheduleRequestDto.scheduleEndDate(),
                scheduleRequestDto.scheduleFrequencyType(),
                scheduleRequestDto.scheduleRepeatEndDate() == null ? null : scheduleRequestDto.scheduleStartDate(), // RepeatStartDate는 StartDate와 동일
                scheduleRequestDto.scheduleRepeatEndDate(),
                scheduleRequestDto.scheduleName(),
                scheduleRequestDto.scheduleColor(),
                scheduleRequestDto.scheduleIsChecklist());
        scheduleRepository.save(schedule);
        log.info("{ ScheduleService } : schedule 생성 성공");
        return ScheduleResponseDto.fromSchedule(schedule, new ArrayList<>());
    }

    public ScheduleResponseDto getSchedule(Long scheduleId) {
        log.info("{ ScheduleService } : schedule 조회");
        User user = userRepository.findByUUIDAndIsDeleted(userId);
        Schedule schedule = scheduleRepository.findScheduleByScheduleIdAndIsDeleted(scheduleId);
        if (schedule == null)
            throw BaseException.type(ScheduleErrorCode.SCHEDULE_NOT_FOUND);
        if (!schedule.getUser().getUserId().equals(user.getUserId()))
            throw BaseException.type(ScheduleErrorCode.USER_IS_NOT_SCHEDULE_WRITER);

        List<ChecklistItemResponseDto> checklistItemResponseDtos = new ArrayList<>();
        if (schedule.getScheduleIsChecklist()) {
            for (ChecklistItem checklistitem : schedule.getChecklistItems()) {
                if (!checklistitem.getIsDeleted())
                    checklistItemResponseDtos.add(ChecklistItemResponseDto.fromChecklistItem(checklistitem));
            }
        }
        log.info("{ ScheduleService } : schedule 조회 성공");
        return ScheduleResponseDto.fromSchedule(schedule, checklistItemResponseDtos);
    }

    public void deleteSchedule(Long scheduleId) {
        log.info("{ ScheduleService } : schedule 삭제");
        User user = userRepository.findByUUIDAndIsDeleted(userId);
        Schedule schedule = scheduleRepository.findScheduleByScheduleIdAndIsDeleted(scheduleId);
        if (schedule == null)
            throw BaseException.type(ScheduleErrorCode.SCHEDULE_NOT_FOUND);
        if (!schedule.getUser().getUserId().equals(user.getUserId()))
            throw BaseException.type(ScheduleErrorCode.USER_IS_NOT_SCHEDULE_WRITER);
        schedule.softDelete();
        log.info("{ ScheduleService } : schedule 삭제 성공");
    }

    public void updateScheduleSetting(Long scheduleId, ScheduleSettingRequestDto scheduleSettingRequestDto) {
        log.info("{ ScheduleService } : schedule ON/OFF 세팅변경");
        User user = userRepository.findByUUIDAndIsDeleted(userId);
        Schedule schedule = scheduleRepository.findScheduleByScheduleIdAndIsDeleted(scheduleId);
        if (schedule == null)
            throw BaseException.type(ScheduleErrorCode.SCHEDULE_NOT_FOUND);
        if (!schedule.getUser().getUserId().equals(user.getUserId()))
            throw BaseException.type(ScheduleErrorCode.USER_IS_NOT_SCHEDULE_WRITER);

        if (scheduleSettingRequestDto.enable()) {  // 체크리스트가 없는 경우, off->on 변경시 AI 체크리스트 생성
            if (schedule.getChecklistItems().isEmpty()) {
                ChecklistResponseDto checklistResponseDto = checklistItemService.createAIChecklist(schedule.getScheduleName());
                List<ChecklistItem> checklistItems = new ArrayList<>();
                for (ChecklistItemResponseDto checklistItemResponseDto : checklistResponseDto.checklist()) {
                    ChecklistItem checklistItem = ChecklistItem.createChecklistByAI(
                            schedule,
                            checklistItemResponseDto.checklistItemCategory(),
                            checklistItemResponseDto.checklistItemContent(),
                            checklistItemResponseDto.checklistItemIsChecked()
                    );
                    checklistItems.add(checklistItem);
                }
                checklistItemRepository.saveAll(checklistItems);
            }
        }
        schedule.updateSetting(scheduleSettingRequestDto.enable());
        log.info("{ ScheduleService } : schedule ON/OFF 세팅변경 성공");
    }

}
