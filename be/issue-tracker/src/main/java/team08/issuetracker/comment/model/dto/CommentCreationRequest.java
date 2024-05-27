package team08.issuetracker.comment.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import team08.issuetracker.comment.model.Comment;

/* 📌 writer 랑, issueId 는 각 각 로그인한 사용자 정보, 이슈 정보를 받아오는건데... 어떻게 해야 할지 감이 오지 않음
* 우선 writer 는 그냥 입력 받는 걸로 틀 잡고, issueId 는 pathvariable id 를 setId 하는 걸로 구현*/
@Data
@AllArgsConstructor
public class CommentCreationRequest {
    private String writer; // fk
    private Long issueId; // fk
    private String content;
    private String uploadedFile;

    public Comment toEntity() {
        return new Comment(writer, issueId, content, uploadedFile);
    }
}
