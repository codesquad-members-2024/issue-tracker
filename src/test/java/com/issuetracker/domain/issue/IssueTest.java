package com.issuetracker.domain.issue;

import com.issuetracker.domain.member.Member;
import com.issuetracker.domain.member.MemberRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.relational.core.conversion.DbActionExecutionException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@SpringBootTest
class IssueTest {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private IssueRepository issueRepository;

    private Member testMember;

    @BeforeEach
    void setUp() {
        Member member = Member.builder()
                .id("tester")
                .password("123")
                .build();

        testMember = memberRepository.save(member);
    }

    @Test
    @DisplayName("작성자, 제목, 내용이 모두 들어있는 이슈는 등록에 성공한다")
    void create_success(){
        // given
        Issue issue = Issue.builder()
                .memberId(testMember.getId())
                .title("testTitle")
                .content("testContent")
                .build();

        // when
        Issue savedIssue = issueRepository.save(issue);

        // then
        assertThat(savedIssue).isEqualTo(issue);
        assertThat(savedIssue.getMemberId()).isEqualTo(testMember.getId());
        assertThat(savedIssue.getCreatedAt()).isNotNull();
        assertThat(savedIssue.getCreatedAt()).isEqualTo(savedIssue.getModifiedAt());
    }

    @Test
    @DisplayName("사용자 아이디가 없으면 이슈 등록에 실패한다.")
    void create_fail(){
        // given
        Issue issue = Issue.builder()
                .title("testTitle")
                .content("testContent")
                .build();

        // when & then
        assertThatThrownBy(() -> issueRepository.save(issue))
                .isInstanceOf(DbActionExecutionException.class);   // TODO: Exception 클래스 변경, CustomException 만들기
    }
}
