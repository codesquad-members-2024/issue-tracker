package codesquad.issuetracker.comment;

import codesquad.issuetracker.util.TimeCalculator;
import lombok.Getter;

@Getter
public class CommentShowDto {

    private Long id;
    private String writer;
    private String content;
    private String duration;
    private String profileImage;

    public CommentShowDto(Comment comment) {
        this.id = comment.getId();
        this.writer = comment.getLoginId();
        this.content = comment.getContent();
        this.duration = TimeCalculator.calculateTimeDifference(comment.getCreatedDate());
        this.profileImage = "https://avatars.githubusercontent.com/u/126778700?s=40&v=4"; // 테스트용 데이터
    }
}
