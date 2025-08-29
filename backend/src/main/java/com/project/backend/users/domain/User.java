package com.project.backend.users.domain;

import com.project.backend.cards.domain.Benefit;
import com.project.backend.global.BaseEntity;
import com.project.backend.schedules.domain.Schedule;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="user")
public class User extends BaseEntity {
    @Id
    @GeneratedValue
    @Column(columnDefinition = "BINARY(16)", updatable = false, nullable = false)
    private UUID userId;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Schedule> schedules = new ArrayList<>();

    @Column(nullable = false)
    private String userName;

    private User(String userName) {
        this.userName = userName;
    }

    public static User createUser(String userName) {
        return new User(userName);
    }
}
