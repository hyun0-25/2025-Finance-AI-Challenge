package com.project.backend.global;

import com.project.backend.global.exception.BaseException;
import com.project.backend.global.exception.GlobalErrorCode;
import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
public class BaseEntity {

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime modifiedAt;

    private Boolean isDeleted = false;

    public void softDelete() {
        if (this.isDeleted)
            throw BaseException.type(GlobalErrorCode.OBJECT_ALREADY_DELETED);
        this.isDeleted = true;
    }

}
