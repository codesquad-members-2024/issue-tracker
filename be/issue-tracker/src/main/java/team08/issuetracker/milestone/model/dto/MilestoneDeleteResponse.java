package team08.issuetracker.milestone.model.dto;

import lombok.Getter;
import team08.issuetracker.milestone.model.Milestone;

@Getter
public class MilestoneDeleteResponse {
    private final long id;
    private final String message;

    public MilestoneDeleteResponse(long id) {
        this.id = id;
        this.message = String.format("마일스톤 삭제 성공! 마일스톤 #%d", id);
    }

    public static MilestoneDeleteResponse from(long id) {
        return new MilestoneDeleteResponse(id);
    }
}
