package codesquad.issuetracker.issue;

import static org.assertj.core.api.Assertions.assertThat;

import codesquad.issuetracker.base.State;
import codesquad.issuetracker.comment.Comment;
import codesquad.issuetracker.comment.CommentRepository;
import codesquad.issuetracker.milestone.Milestone;
import codesquad.issuetracker.milestone.MilestoneRepository;
import java.util.List;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.jdbc.DataJdbcTest;
import org.springframework.data.jdbc.core.mapping.AggregateReference;
import org.springframework.test.context.jdbc.Sql;

@DataJdbcTest
@Slf4j
@Sql({"/sql/label-data.sql", "/sql/user-data.sql", "/sql/milestone-data.sql"})
class IssueRepositoryTest {

    @Autowired
    IssueRepository issueRepository;
    @Autowired
    MilestoneRepository milestoneRepository;
    @Autowired
    CommentRepository commentRepository;

    @Test
    @DisplayName("열린 이슈 목록 가져오기")
    void getOpenIssues() {

        Issue issue1 = Issue.builder()
            .authorId("cori1234")
            .title("제목1")
            .state(State.OPEN)
            .build();
        Issue issue2 = Issue.builder()
            .authorId("cori1234")
            .title("제목2")
            .state(State.OPEN)
            .build();
        Issue issue3 = Issue.builder()
            .authorId("cori1234")
            .title("제목3")
            .state(State.OPEN)
            .build();

        issueRepository.save(issue1);
        issueRepository.save(issue2);
        issueRepository.save(issue3);

        List<Issue> openIssues = issueRepository.findAllByState(State.OPEN);

        assertThat(openIssues).hasSize(3);
    }

    @Test
    @DisplayName("이슈를 만들고 저장소에 저장하는 테스트")
    void testCreateAndSaveIssue() {

        Issue issue = Issue.builder()
            .authorId("cori1234")
            .title("제목")
            .build();
        Issue savedIssued = issueRepository.save(issue);

        assertThat(savedIssued).usingRecursiveComparison().isEqualTo(issue);
    }

    @Test
    @DisplayName("레이블 레퍼런스를 가져올 수 있다.")
    void findLabels() {
        Set<IssueAttachedLabel> labelRefs = Set.of(new IssueAttachedLabel(1L),
            new IssueAttachedLabel(2L), new IssueAttachedLabel(3L));
        Issue issue = Issue.builder()
            .authorId("cori1234")
            .title("제목")
            .labelRefs(labelRefs)
            .build();
        Issue savedIssued = issueRepository.save(issue);

        Issue findIssue = issueRepository.findById(savedIssued.getId()).get();
        assertThat(findIssue.getLabelRefs()).hasSize(labelRefs.size());
    }

    @Test
    @DisplayName("해당 레이블을 가지고 있는 이슈를 가져올 수 있다.")
    void findIssuesByLabel() {
        IssueAttachedLabel labelRef1 = new IssueAttachedLabel(1L);
        IssueAttachedLabel labelRef2 = new IssueAttachedLabel(2L);
        IssueAttachedLabel labelRef3 = new IssueAttachedLabel(3L);

        Issue issue1 = Issue.builder()
            .authorId("cori1234")
            .title("제목1")
            .labelRefs(Set.of(labelRef3))
            .build();
        Issue issue2 = Issue.builder()
            .authorId("cori1234")
            .title("제목2")
            .labelRefs(Set.of(labelRef2))
            .build();
        Issue issue3 = Issue.builder()
            .authorId("cori1234")
            .title("제목3")
            .labelRefs(Set.of(labelRef1))
            .build();
        issueRepository.save(issue1);
        issueRepository.save(issue2);
        issueRepository.save(issue3);

        List<Issue> issues = issueRepository.findAllByLabelId(1L);
        assertThat(issues).allMatch(issue -> issue.getLabelRefs().contains(labelRef1));
    }

    @Test
    @DisplayName("연관된 마일스톤을 가져올 수 있다.")
    void getRelatedMilestone() {
        Issue issue = Issue.builder()
            .authorId("cori1234")
            .title("제목1")
            .milestoneId(AggregateReference.to(1L))
            .build();

        Issue savedIssue = issueRepository.save(issue);
        AggregateReference<Milestone, Long> milestoneRef = savedIssue.getMilestoneId();
        Milestone milestone = milestoneRepository.findById(milestoneRef.getId()).get();

        log.debug("milestone = {}", milestone);
        assertThat(milestone.getId()).isEqualTo(1L);
    }

    @Test
    @DisplayName("이슈 제목을 업데이트할 수 있다.")
    void updateTitle() {
        Issue issue = Issue.builder()
            .authorId("cori1234")
            .title("old title")
            .build();

        String newTitle = "New Title";
        Issue savedIssue = issueRepository.save(issue);
        savedIssue.updateTitle(newTitle);
        Issue updatedIssue = issueRepository.save(savedIssue);

        assertThat(updatedIssue.getTitle()).isEqualTo(newTitle);
    }

    @Test
    @DisplayName("이슈를 삭제하면 연관된 댓글도 삭제 한다.")
    void  deleteIssue() {
        Comment comment1 = Comment.builder()
            .contents("댓글 1")
            .isDeleted(false)
            .build();
        Comment comment2 = Comment.builder()
            .contents("댓글 1")
            .isDeleted(false)
            .build();

        Issue issue = Issue.builder()
            .authorId("cori1234")
            .title("old title")
            .isDeleted(false)
            .comments(List.of(comment1, comment2))
            .build();

        Issue savedIssue = issueRepository.save(issue);

        Issue findIssue = issueRepository.findById(savedIssue.getId()).get();
        findIssue.delete();
        Issue deletedIssue = issueRepository.save(findIssue);

        List<Comment> all = (List<Comment>) commentRepository.findAll();
        assertThat(all).allMatch(Comment::isDeleted);
        assertThat(deletedIssue.isDeleted()).isEqualTo(true);
    }
}