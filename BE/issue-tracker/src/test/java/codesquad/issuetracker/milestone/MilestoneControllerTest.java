package codesquad.issuetracker.milestone;


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

@WebMvcTest(MilestoneController.class)
class MilestoneControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private MilestoneService milestoneService;

    @Test
    @DisplayName("마일스톤을 불러오고 200을 리턴하는지 테스트")
    void testFetchAllMilestonesReturnStatus200() throws Exception {

        Milestone milestone1 = Milestone.builder()
            .title("테스트 마일스톤")
            .description("테스트 내용")
            .dueDate(null)
            .openAt(null)
            .isOpen(true)
            .isDeleted(false)
            .updatedAt(null)
            .build();

        Milestone milestone2 = Milestone.builder()
            .title("테스트 마일스톤2")
            .description("테스트 내용2")
            .dueDate(null)
            .openAt(null)
            .isOpen(true)
            .isDeleted(false)
            .updatedAt(null)
            .build();

        when(milestoneService.fetchAllMilestones()).thenReturn(
            List.of(milestone1, milestone2));

        mockMvc.perform(get("/api/milestones"))
            .andExpect(status().isOk());
    }

    @Test
    @DisplayName("/api/milestones 에 접근했을 때 json 반환 결과 테스트")
    void testFetchAllMilestonesReturnJson() throws Exception {

        Milestone milestone1 = Milestone.builder()
            .title("테스트 마일스톤")
            .description("테스트 내용")
            .dueDate(null)
            .openAt(null)
            .isOpen(true)
            .isDeleted(false)
            .updatedAt(null)
            .build();

        when(milestoneService.fetchAllMilestones()).thenReturn(List.of(milestone1));


        mockMvc.perform(get("/api/milestones"))
            .andExpect(jsonPath("$[0].title").value("테스트 마일스톤"))
            .andExpect(jsonPath("$[0].description").value("테스트 내용"))
            .andExpect(jsonPath("$[0].dueDate").isEmpty())
            .andExpect(jsonPath("$[0].openAt").isEmpty())
            .andExpect(jsonPath("$[0].open").value(true))
            .andExpect(jsonPath("$[0].deleted").value(false))
            .andExpect(jsonPath("$[0].updatedAt").isEmpty());


    }
}
