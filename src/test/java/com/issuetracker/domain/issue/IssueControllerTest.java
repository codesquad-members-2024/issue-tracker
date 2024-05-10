package com.issuetracker.domain.issue;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.issuetracker.domain.issue.request.IssueCreateRequest;
import com.issuetracker.domain.issue.response.IssueDetailResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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

    @ParameterizedTest
    @ValueSource(longs = {1, 2, 3})
    @DisplayName("이슈의 id를 통해 해당 id issue의 상세 내용을 조회할 수 있다")
    void detail(Long issueId) throws Exception {
        // given
        String url = "/issues/" + issueId.toString();
        IssueDetailResponse response = IssueDetailResponse.builder()
                .id(issueId)
                .build();
        given(issueService.getDetail(issueId)).willReturn(response);

        // when
        ResultActions result = mockMvc.perform(get(url));

        // then
        result.andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(objectMapper.writeValueAsString(response)));
    }
}
