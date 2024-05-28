package com.CodeSquad.IssueTracker.issues.issueLabel.dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@Builder
public class LabelRequest {
    private Long labelId;
    private String labelName;
    private String textColor;
    private String bgColor;
}
