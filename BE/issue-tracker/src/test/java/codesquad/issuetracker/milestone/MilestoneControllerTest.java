package codesquad.issuetracker.milestone;


import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import codesquad.issuetracker.milestone.dto.MilestoneQueryInfo;
import codesquad.issuetracker.milestone.dto.MilestoneResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Collections;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(MilestoneController.class)
class MilestoneControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private MilestoneService milestoneService;


    @Test
    @DisplayName("마일스톤을 불러오고 200을 리턴하는지 테스트")
    void testFetchAllMilestonesReturnStatus200() throws Exception {

        MilestoneQueryInfo milestoneQueryInfo = MilestoneQueryInfo.builder()
            .direction("asc")
            .sort("updated_at")
            .state("open")
            .build();

        MilestoneResponse milestoneResponse = MilestoneResponse.builder()
            .id(1L)
            .title("테스트 마일스톤")
            .description("테스트 내용")
            .dueDate(null)
            .state("OPEN")
            .updatedAt(null)
            .build();

        when(milestoneService.fetchFilteredMilestones(any(MilestoneQueryInfo.class))).thenReturn(
            Collections.singletonList(milestoneResponse));
        mockMvc.perform(get("/api/milestones"))
            .andExpect(status().isOk());
    }

    @Test
    @DisplayName("/api/milestones 에 접근했을 때 json 반환 결과 테스트")
    void testFetchAllMilestonesReturnJson() throws Exception {

        MilestoneQueryInfo milestoneQueryInfo = MilestoneQueryInfo.builder()
            .direction("asc")
            .sort("updated_at")
            .state("open")
            .build();

        MilestoneResponse milestoneResponse = MilestoneResponse.builder()
            .id(1L)
            .title("테스트 마일스톤")
            .description("테스트 내용")
            .dueDate(null)
            .state("OPEN")
            .updatedAt(null)
            .build();

        when(milestoneService.fetchFilteredMilestones(any(MilestoneQueryInfo.class))).thenReturn(
            Collections.singletonList(milestoneResponse));

        ObjectMapper objectMapper = new ObjectMapper();
        String expectJson = objectMapper.writeValueAsString(List.of(milestoneResponse));
        mockMvc.perform(get("/api/milestones"))
            .andExpect(content().json(expectJson));

    }

    @Test
    @DisplayName("MilestoneQueryInfo에 쿼리 파라미터가 잘 전달되는지 테스트")
    void testMilestoneQueryInfoReceivesParamCorrectly() throws Exception {

        mockMvc.perform(get("/api/milestones/test")
                .param("direction", "DESC")
                .param("sort", "due_date")
                .param("state", "CLOSED"))
            .andExpect(status().isOk());

    }

    @Test
    @DisplayName("쿼리 파라미터에 소문자가 입력되어도 enum과 맵핑되는지 테스트")
    void testMilestoneQueryInfoReceivesLowerCaseParam() throws Exception {
        mockMvc.perform(get("/api/milestones/test")
                .param("direction", "desc")
                .param("sort", "due_date")
                .param("state", "closed"))
            .andExpect(status().isOk());
    }
}
