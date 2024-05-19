package com.codesquad.team3.issuetracker.domain.issue.dto.request;

import com.codesquad.team3.issuetracker.domain.file.dto.UploadFile;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@Getter
public class CreateIssue {

    @NotEmpty(message = "이슈 제목은 필수입니다")
    @Size(min = 1, max = 60, message = "제목은 1 ~ 60 글자여야합니다")
    private String title;

    @NotEmpty(message = "이슈 내용은 필수 입니다")
    @Size(min = 1, max = 500, message = "이슈 내용은 1 ~ 500글자여야 합니다")
    private String contents;

    @NotEmpty(message = "작성자는 필수입니다")
    private int writer;

    private List<String> labels = new ArrayList<>();

    private final UploadFile file = null;

    private final Integer assignee = null;

    private final Integer milestone = null;
}
