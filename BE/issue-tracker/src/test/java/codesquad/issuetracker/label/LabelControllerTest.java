package codesquad.issuetracker.label;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import codesquad.issuetracker.milestone.MilestoneService;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(LabelController.class)
class LabelControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private LabelService labelService;
    @MockBean
    private MilestoneService milestoneService;

    private List<Label> labels;

    @BeforeEach
    void setUp() {
        labels = List.of(
            Label.builder()
                .name("테스트 라벨")
                .description("테스트 내용")
                .backgroundColor("#FF0000")
                .textColor(TextColor.WHITE)
                .isDeleted(false)
                .build(),
            Label.builder()
                .name("테스트 라벨2")
                .description("테스트 내용2")
                .backgroundColor("#DC143C")
                .textColor(TextColor.BLACK)
                .isDeleted(false)
                .build()
        );
    }


    @Test
    @DisplayName("라벨 목록을 불러오는 테스트")
    public void fetchFilteredLabels_ReturnsLabelsOfSizeTwo() throws Exception {
        when(labelService.fetchFilteredLabels(any(Pageable.class))).thenReturn(labels);

        mockMvc.perform(get("/api/labels")
                .contentType(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$", hasSize(2)));
    }

}

