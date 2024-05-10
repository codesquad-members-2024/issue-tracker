package com.issuetracker.domain.issue;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.issuetracker.domain.issue.request.IssueCreateRequest;
import com.issuetracker.domain.issue.request.IssueUpdateRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(IssueController.class)
class IssueControllerTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IssueService issueService;

    @Test
    void create() throws Exception {
        // given
        final String url = "/issues";

        IssueCreateRequest request = new IssueCreateRequest("testMember", "testTitle", "testContent");
        final String requestJson = objectMapper.writeValueAsString(request);
        given(issueService.create(any(IssueCreateRequest.class))).willReturn(1L);

        // when
        final ResultActions result = mockMvc.perform(
                post(url).content(requestJson)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        result.andExpect(status().isCreated())
                .andExpect(header().string("Location", "/issues/1"));
    }

    @Test
    @DisplayName("이슈 id가 1번의 제목을 'Hello update' 로 수정 요청하면 '/issues/1' 로 리다이렉트 된다")
    void editTitle() throws Exception {
        // given
        String url = "/issues/1";
        String updatedTitle = "Hello update";

        IssueUpdateRequest request = new IssueUpdateRequest(1L, updatedTitle, null);
        String requestJson = objectMapper.writeValueAsString(request);

        // when
        ResultActions result = mockMvc.perform(
                patch(url).content(requestJson)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        result.andExpect(status().is3xxRedirection())
                .andExpect(redirectedUrl("/issues/1"));
    }
}
