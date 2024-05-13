package com.issuetracker.domain.label;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.issuetracker.domain.label.request.LabelCreateRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.willDoNothing;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(LabelController.class)
class LabelControllerTest {

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

        //given
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
}