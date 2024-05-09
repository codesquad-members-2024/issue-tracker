package com.issuetracker.domain.issue;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.issuetracker.domain.issue.request.IssueCreateRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.BDDMockito.*;
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
        given(issueService.create(request)).willReturn(1L);

        // when
        final ResultActions result = mockMvc.perform(
                post(url).content(requestJson)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        result.andExpect(status().isCreated())
                .andExpect(header().string("Location", "/issues/1"));
    }
}
