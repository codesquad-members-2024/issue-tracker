package com.issuetracker.domain.issue.request;

import static org.assertj.core.api.Assertions.assertThat;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class IssueUpdateRequestTest {

    @Autowired
    private Validator validator;

    @Test
    @DisplayName("issueId 필드가 Null 이면 @NotNull 검증을 통과하지 못한다")
    void validate_fail_when_id_is_null() {
        // given
        IssueUpdateRequest form = IssueUpdateRequest.builder().build();

        // when
        Set<ConstraintViolation<IssueUpdateRequest>> violations = validator.validate(form);

        Iterator<ConstraintViolation<IssueUpdateRequest>> iterator = violations.iterator();
        List<String> message = new ArrayList<>();

        while (iterator.hasNext()) {
            ConstraintViolation<IssueUpdateRequest> next = iterator.next();
            message.add(next.getMessage());
        }

        // then
        assertThat(message).hasSize(1);
        assertThat(message.get(0)).isEqualTo("Issue Id가 Null 일 수 없습니다");
    }

    @Test
    @DisplayName("issueId 필드가 null 이 아니면 @NotNull 검증에 통과한다")
    void validate_success() {
        // given
        IssueUpdateRequest form = IssueUpdateRequest.builder().issueId(1L).build();

        // when
        Set<ConstraintViolation<IssueUpdateRequest>> violations = validator.validate(form);

        // then
        assertThat(violations).isEmpty();
    }
}