package com.codesquad.team3.issuetracker.domain.file.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public class UploadFile {

    @NotEmpty(message = "파일 확장자는 필수입니다")
    private final String type;

    @NotEmpty(message = "파일 데이터는 필수입니다")
    private final String data;

}
