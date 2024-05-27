package team08.issuetracker.comment.model.dto;

import lombok.Getter;
import team08.issuetracker.comment.model.Comment;

@Getter
public class CommentCreationResponse {

    private static final String CREATE_SUCCESS_MESSAGE_FORMAT = "코멘트 생성 성공! 코멘트 #%d 작성자 : %s";

    private final Long id;
    private final String writer;
    private final String message;

    public CommentCreationResponse(Comment comment) {
        this.id = comment.getId();
        this.writer = comment.getWriter();
        this.message = generateSuccessMessage(comment);
    }

    private String generateSuccessMessage(Comment comment) {
        return String.format(CREATE_SUCCESS_MESSAGE_FORMAT, comment.getId(), comment.getWriter());
    }

    public static CommentCreationResponse from(Comment comment){
        return new CommentCreationResponse(comment);
    }
}
