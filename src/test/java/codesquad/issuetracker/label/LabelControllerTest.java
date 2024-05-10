package codesquad.issuetracker.label;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(LabelController.class)
class LabelControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LabelService labelService;

    @Test
    @DisplayName("라벨을 불러오고 200을 리턴하는지 테스트")
    void testFetchAllLabelsReturnStatus200() throws Exception {

        Label label1 = Label.builder()
            .name("테스트 라벨")
            .description("테스트 내용")
            .color("#FF0000")
            .build();

        Label label2 = Label.builder()
            .name("테스트 라벨2")
            .description("테스트 내용2")
            .color("#DC143C")
            .build();

        when(labelService.fetchAllLabels()).thenReturn(
            List.of(label1, label2));

        mockMvc.perform(get("/api/labels"))
            .andExpect(status().isOk());
    }

    @Test
    @DisplayName("/api/labels 에 접근했을 때 json 반환 결과 테스트")
    void testFetchAllLabelsReturnJson() throws Exception {

        Label label1 = Label.builder()
            .name("테스트 라벨")
            .description("테스트 내용")
            .color("#FF0000")
            .build();



        when(labelService.fetchAllLabels()).thenReturn(
            List.of(label1));

        mockMvc.perform(get("/api/labels"))
            .andExpect(jsonPath("$[0].name").value("테스트 라벨"))
            .andExpect(jsonPath("$[0].description").value("테스트 내용"))
            .andExpect(jsonPath("$[0].color").value("#FF0000"));


    }
}

