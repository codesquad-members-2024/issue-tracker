package team08.issuetracker.milestone.model.dto;

import lombok.Getter;
import team08.issuetracker.milestone.model.Milestone;

@Getter
public class MilestoneCreationResponse {
    private final Long id;
    private final String name;
    private final String message;

    public MilestoneCreationResponse(Milestone milestone) {
        this.id = milestone.getId();
        this.name = milestone.getName();
        this.message = String.format("마일스톤 생성 성공! 마일스톤 #%d 이름 : %s", id, name);
    }

    public static MilestoneCreationResponse from(Milestone milestone) {
        return new MilestoneCreationResponse(milestone);
    }
}
