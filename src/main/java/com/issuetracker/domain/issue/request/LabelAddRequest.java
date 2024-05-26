package com.issuetracker.domain.issue.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LabelAddRequest {

    @NotBlank
    private String labelId;
}
