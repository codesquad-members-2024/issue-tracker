package com.issuetracker.domain.label;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.issuetracker.domain.label.request.LabelCreateRequest;
import com.issuetracker.domain.label.response.LabelResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.util.Arrays;
import java.util.List;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(LabelController.class)
class ElementControllerTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LabelService labelService;

    private final String urlPrefix = "/api/v1";

    @Test
    @DisplayName("라벨을 생성하면 200 상태코드를 응답한다.")
    void create() throws Exception {

        // given
        String url = urlPrefix + "/labels";

        LabelCreateRequest request = new LabelCreateRequest("bug", "버그 라벨", "#FFFFFF", "#000000");
        String requestJson = objectMapper.writeValueAsString(request);
        willDoNothing().given(labelService).create(any(LabelCreateRequest.class));

        // when
        ResultActions result = mockMvc.perform(
                post(url).content(requestJson)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        // then
        result.andExpect(status().isOk());
    }

    @Test
    @DisplayName("모든 라벨 목록을 조회할 수 있다.")
    void getLabels() throws Exception {

        // given
        String url = urlPrefix + "/labels";

        String[][] labelData = {
                {"bug", "버그", "#FFFFFF", "#000000"},
                {"feat", "새로운 기능", "#020202", "#EFEFEF"},
                {"fix", "버그 수정", "#757575", "#A0A0A0"}
        };
        List<LabelResponse.Element> labels =
                Arrays.stream(labelData).map(label -> LabelResponse.Element.of(
                        com.issuetracker.domain.label.Label.builder()
                                .id(label[0])
                                .description(label[1])
                                .textColor(label[2])
                                .colorCode(label[3])
                                .build()
        )).toList();
        LabelResponse.Labels labelListResponse = LabelResponse.Labels.of(labels);

        given(labelService.getLabels()).willReturn(labelListResponse);

        // when
        ResultActions result = mockMvc.perform(get(url));

        // then
        result.andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(objectMapper.writeValueAsString(labelListResponse)));
    }
}