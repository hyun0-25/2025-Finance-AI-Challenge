package com.project.backend.users.service;

import com.project.backend.users.domain.User;
import com.project.backend.users.dto.request.UserRequestDto;
import com.project.backend.users.dto.response.UserResponseDto;
import com.project.backend.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserResponseDto createUser(UserRequestDto userRequestDto) {
        log.info("{ UserService } : user 생성");
        User user = User.createUser(userRequestDto.userName());
        userRepository.save(user);
        log.info("{ UserService } : user 생성 성공");
        return UserResponseDto.fromUser(user);
    }

}
