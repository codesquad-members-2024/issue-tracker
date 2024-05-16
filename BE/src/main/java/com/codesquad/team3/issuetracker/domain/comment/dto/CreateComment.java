package com.codesquad.team3.issuetracker.domain.comment.dto;

import com.codesquad.team3.issuetracker.domain.file.dto.UploadFile;
import com.codesquad.team3.issuetracker.domain.issue.dto.request.CreateIssue;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class CreateComment {

    private int writer_id;
    private String contents;
    private int issue_id;
    private UploadFile uploadFile = null;

    /**
     * 이슈의 내용 커멘트
     */
    public CreateComment(Integer issue_id, CreateIssue createIssue) {
        writer_id = createIssue.getWriter();
        contents = createIssue.getContents();
        uploadFile = createIssue.getFile();
        this.issue_id = issue_id;
    }
}
