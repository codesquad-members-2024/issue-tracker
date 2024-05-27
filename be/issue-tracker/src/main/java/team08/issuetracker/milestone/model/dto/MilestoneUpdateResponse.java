package team08.issuetracker.milestone.model.dto;

import lombok.Getter;
import team08.issuetracker.milestone.model.Milestone;

@Getter
public class MilestoneUpdateResponse {
    private final Long id;
    private final String name;
    private final String message;

    public MilestoneUpdateResponse(Milestone milestone) {
        this.id = milestone.getId();
        this.name = milestone.getName();
        this.message = String.format("Milestone의 정보가 업데이트 되었습니다. ID : %d, Name : %s, IsOpened : %s", milestone.getId(), milestone.getName(), milestone.isOpen());
    }

    public static MilestoneUpdateResponse from(Milestone milestone) {
        return new MilestoneUpdateResponse(milestone);
    }
}
