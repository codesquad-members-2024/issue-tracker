package codesquad.issuetracker.issue;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

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

    @BeforeEach
    void init() {
        Issue issue1 = Issue.builder()
            .id(1L)
            .isOpen(true)
            .build();
        Issue issue2 = Issue.builder()
            .id(2L)
            .isOpen(true)
            .build();
        Issue issue3 = Issue.builder()
            .id(3L)
            .isOpen(false)
            .build();
        Issue issue4 = Issue.builder()
            .id(4L)
            .isOpen(false)
            .build();

        List<Issue> openIssues = List.of(issue1, issue2);
        List<Issue> closedIssues = List.of(issue3, issue4);

        when(issueService.findIssuesByIsOpen(true)).thenReturn(openIssues);
        when(issueService.findIssuesByIsOpen(false)).thenReturn(closedIssues);
    }

    @Test
    @DisplayName("열린 이슈 목록을 가져올 수 있다.")
    void getOpenIssues() throws Exception {

        mockMvc.perform(get("/api/issues?isOpen=true"))
            .andExpect(jsonPath("$[0].open").value(true))
            .andExpect(jsonPath("$[1].open").value(true));
    }

    @Test
    @DisplayName("닫힌 이슈 목록을 가져올 수 있다.")
    void getClosedIssues() throws Exception {

        mockMvc.perform(get("/api/issues"))
            .andExpect(jsonPath("$[0].open").value(false))
            .andExpect(jsonPath("$[1].open").value(false));
    }

}