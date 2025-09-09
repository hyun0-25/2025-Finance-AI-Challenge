package com.project.backend.users.repository;

import com.project.backend.users.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    @Query("SELECT u FROM User u WHERE u.userId = :uuid AND u.isDeleted = false")
    User findByUUIDAndIsDeleted(@Param("uuid") UUID uuid);
}
