package codesquad.issuetracker.comment;

import lombok.Getter;

@Getter
public class CommentShowDto {

    private Long id;
    private String writer;
    private String content;

    public CommentShowDto(Comment comment) {
        this.id = comment.getId();
        this.writer = comment.getWriter();
        this.content = comment.getContent();
    }
}
