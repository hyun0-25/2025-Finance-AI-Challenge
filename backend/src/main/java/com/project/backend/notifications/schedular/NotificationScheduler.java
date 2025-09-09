package com.project.backend.notifications.schedular;

import com.project.backend.notifications.dto.request.FcmMessageRequestDto;
import com.project.backend.notifications.service.NotificationService;
import com.project.backend.schedules.domain.Schedule;
import com.project.backend.schedules.domain.ScheduleFrequencyType;
import com.project.backend.schedules.repository.ScheduleRepository;
import com.project.backend.users.domain.User;
import com.project.backend.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Component
public class NotificationScheduler {
    @Value("${TEST_USER_UUID}")
    private UUID userId;

    private final ScheduleRepository scheduleRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    // 매일 오전 9시 실행
    @Scheduled(cron = "0 0 9 * * *")
    public void sendScheduleNotifications() {
        log.info("{ NotificationScheduler } : notification Scheduler 시작");

        LocalDate targetDate = LocalDate.now().plusDays(3);
        List<Schedule> schedules = scheduleRepository.findScheduleByUserIdAndStartDate(userId, targetDate);

        for (Schedule s : schedules) {
            if (s.getScheduleFrequency() == ScheduleFrequencyType.NONE)
                notificationService.sendNotificationByUserUUID(toMessage(s));
            else {
                if (repeatSchedule(s, targetDate) != null)
                    notificationService.sendNotificationByUserUUID(toMessage(s));
            }
        }
        log.info("{ NotificationScheduler } : notification Scheduler 종료");
    }

    public FcmMessageRequestDto toMessage(Schedule schedule) {
        //AI 서버로 부터 받은 응답
//        String title = "";
//        String body = "";
        String title = schedule.getScheduleId() + " : 스케줄 id";
        String body = schedule.getScheduleName();

        return FcmMessageRequestDto.toFcmMessage(schedule.getUser().getUserId(), schedule.getScheduleId(), title, body);
    }


    public Schedule repeatSchedule(Schedule schedule, LocalDate targetDate) {
        LocalDateTime scheduleStart = schedule.getScheduleStartDate();
        LocalDateTime scheduleEnd = schedule.getScheduleEndDate();

        while (scheduleStart.isBefore(targetDate.atStartOfDay())) {
            if (scheduleStart.toLocalDate().isEqual(targetDate)) {
                return schedule;
            }
            LocalDateTime[] next = addInterval(schedule.getScheduleFrequency(), scheduleStart, scheduleEnd);
            scheduleStart = next[0];
            scheduleEnd = next[1];
        }
        return null;
    }

    public LocalDateTime[] addInterval(ScheduleFrequencyType scheduleFrequencyType, LocalDateTime scheduleStart, LocalDateTime scheduleEnd) {
        return switch (scheduleFrequencyType) {
            case DAILY -> new LocalDateTime[]{scheduleStart.plusDays(1), scheduleEnd.plusDays(1)};
            case WEEKLY -> new LocalDateTime[]{scheduleStart.plusWeeks(1), scheduleEnd.plusWeeks(1)};
            case MONTHLY -> new LocalDateTime[]{scheduleStart.plusMonths(1), scheduleEnd.plusMonths(1)};
            case YEARLY -> new LocalDateTime[]{scheduleStart.plusYears(1), scheduleEnd.plusYears(1)};
            default -> new LocalDateTime[]{scheduleStart, scheduleEnd};
        };
    }
}
