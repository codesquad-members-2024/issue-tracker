package com.issuetracker.domain.issue;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.issuetracker.domain.issue.request.IssueCreateRequest;
import com.issuetracker.domain.issue.request.IssueUpdateRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.DynamicTest;
import com.issuetracker.domain.issue.response.IssueDetailResponse;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestFactory;
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
import java.util.stream.Stream;

import static org.junit.jupiter.api.DynamicTest.dynamicTest;
import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@WebMvcTest(IssueController.class)
class IssueControllerTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IssueService issueService;

    @Test
    @DisplayName("이슈를 생성하면 201 상태코드와 Location 헤더로 해당 이슈 상세조회 uri를 응답한다.")
    void create() throws Exception {
        // given
        String url = "/issues";

        IssueCreateRequest request = new IssueCreateRequest("testMember", "testTitle", "testContent");
        String requestJson = objectMapper.writeValueAsString(request);
        given(issueService.create(any(IssueCreateRequest.class))).willReturn(1L);

        // when
        ResultActions result = mockMvc.perform(
                post(url).content(requestJson)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        result.andExpect(status().isCreated())
                .andExpect(header().string("Location", "/issues/1"));
    }

    @TestFactory
    @DisplayName("이슈 생성 시 요청값에 대한 validation을 진행한다")
    Stream<DynamicTest> create_validation() throws Exception{
        final String url = "/issues";
        final String memberId = "testMember";
        final String title = "t";
        final String content = "c";

        given(issueService.create(any(IssueCreateRequest.class))).willReturn(1L);

        return Stream.of(
                dynamicTest("제목은 최대 120자 이내여야 한다.", () -> {
                    // given
                    IssueCreateRequest tooLongTitle = new IssueCreateRequest(memberId, title.repeat(120 + 1), content);
                    String requestJson = objectMapper.writeValueAsString(tooLongTitle);

                    // when
                    ResultActions result = mockMvc.perform(
                            post(url).content(requestJson)
                                    .contentType(MediaType.APPLICATION_JSON)
                    );

                    // then
                    result.andExpect(status().is4xxClientError());
                }),

                dynamicTest("내용은 최대 2000자 이내여야 한다.", () -> {
                    // given
                    IssueCreateRequest tooLongContent = new IssueCreateRequest(memberId, title, content.repeat(2000 + 1));
                    String requestJson = objectMapper.writeValueAsString(tooLongContent);

                    // when
                    ResultActions result = mockMvc.perform(
                            post(url).content(requestJson)
                                    .contentType(MediaType.APPLICATION_JSON)
                    );

                    // then
                    result.andExpect(status().is4xxClientError());
                }),

                dynamicTest("모든 필드는 공백이거나 빈 값, null이어선 안 된다.", () -> {
                    // given
                    IssueCreateRequest blankRequest = new IssueCreateRequest(" ", " ", " ");
                    String requestJson = objectMapper.writeValueAsString(blankRequest);

                    // when
                    ResultActions result = mockMvc.perform(
                            post(url).content(requestJson)
                                    .contentType(MediaType.APPLICATION_JSON)
                    );

                    // then
                    result.andExpect(status().is4xxClientError());
                })
        );
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
        result.andExpect(status().isOk());
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
