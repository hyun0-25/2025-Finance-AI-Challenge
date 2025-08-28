package com.project.backend.users.controller;

import com.project.backend.users.dto.request.UserRequestDto;
import com.project.backend.users.dto.response.UserResponseDto;
import com.project.backend.users.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserResponseDto> createUser(@RequestBody UserRequestDto userRequestDto) {
        log.info("{ UserController } : User 생성 진입");
        UserResponseDto userResponseDto = userService.createUser(userRequestDto);
        log.info("{ UserController } : User 생성 성공");

        return ResponseEntity.status(HttpStatus.CREATED).body(userResponseDto);
    }
}
