package codesquad.issuetracker.domain;

import org.springframework.data.annotation.Id;

// 다대다 연관관계 해결을 위한 중간 테이블 구현 예정
public class IssueLabel {

    @Id
    private Long id;
    private Label label;
    private Issue issue;
}
