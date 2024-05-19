package codesquad.issuetracker.issue;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import codesquad.issuetracker.base.State;
import codesquad.issuetracker.comment.CommentService;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(IssueController.class)
class IssueControllerTest {

    @Autowired
    MockMvc mockMvc;
    @MockBean
    IssueService issueService;
    @MockBean
    CommentService commentService;

    @BeforeEach
    void init() {
        Issue issue1 = Issue.builder()
            .id(1L)
            .state(State.OPEN)
            .build();
        Issue issue2 = Issue.builder()
            .id(2L)
            .state(State.OPEN)
            .build();
        Issue issue3 = Issue.builder()
            .id(3L)
            .state(State.CLOSED)
            .build();
        Issue issue4 = Issue.builder()
            .id(4L)
            .state(State.CLOSED)
            .build();

        List<Issue> openIssues = List.of(issue1, issue2);
        List<Issue> closedIssues = List.of(issue3, issue4);

        when(issueService.findIssuesByState(State.OPEN)).thenReturn(openIssues);
        when(issueService.findIssuesByState(State.CLOSED)).thenReturn(closedIssues);
    }

    @Test
    @DisplayName("열린 이슈 목록을 가져올 수 있다.")
    void getOpenIssues() throws Exception {

        mockMvc.perform(get("/api/issues?state=OPEN"))
            .andExpect(jsonPath("$[0].state").value("OPEN"))
            .andExpect(jsonPath("$[1].state").value("OPEN"));
    }

    @Test
    @DisplayName("닫힌 이슈 목록을 가져올 수 있다.")
    void getClosedIssues() throws Exception {

        mockMvc.perform(get("/api/issues?state=CLOSED"))
            .andExpect(jsonPath("$[0].state").value("CLOSED"))
            .andExpect(jsonPath("$[1].state").value("CLOSED"));
    }

}