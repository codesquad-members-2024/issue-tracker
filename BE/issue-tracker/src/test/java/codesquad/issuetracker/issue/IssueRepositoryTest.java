package codesquad.issuetracker.issue;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import java.util.Set;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.jdbc.DataJdbcTest;
import org.springframework.test.context.jdbc.Sql;

@DataJdbcTest
@Slf4j
@Sql({"/sql/label-data.sql", "/sql/user-data.sql"})
class IssueRepositoryTest {

    @Autowired
    IssueRepository issueRepository;

    @Test
    @DisplayName("열린 이슈 목록 가져오기")
    void getOpenIssues() {

        Issue issue1 = Issue.builder()
            .authorId("cori1234")
            .title("제목1")
            .isOpen(true)
            .build();
        Issue issue2 = Issue.builder()
            .authorId("cori1234")
            .title("제목2")
            .isOpen(true)
            .build();
        Issue issue3 = Issue.builder()
            .authorId("cori1234")
            .title("제목3")
            .isOpen(true)
            .build();

        issueRepository.save(issue1);
        issueRepository.save(issue2);
        issueRepository.save(issue3);

        List<Issue> openIssues = issueRepository.findAllByIsOpen(true);

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
        Set<IssueAttachedLabel> labelRefs = Set.of(new IssueAttachedLabel(1L), new IssueAttachedLabel(2L), new IssueAttachedLabel(3L));
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
}