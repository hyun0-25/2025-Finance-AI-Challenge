package com.project.backend.users.dto.response;

import com.project.backend.users.domain.User;
import lombok.Builder;

import java.util.UUID;

@Builder
public record UserResponseDto(
        UUID userId,
        String userName
) {
    public static UserResponseDto fromUser(User user) {
        return UserResponseDto.builder()
                .userId(user.getUserId())
                .userName(user.getUserName())
                .build();
    }
}
