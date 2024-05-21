package team08.issuetracker.milestone.model;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import team08.issuetracker.milestone.model.dto.MilestoneUpdateRequest;

import java.time.LocalDate;

@Getter
public class Milestone {
    @Id
    private Long id;
    private boolean isOpen;
    private String name;
    private String description;
    private LocalDate completeDate;

    public Milestone(String name, String description, LocalDate completeDate) {
        this.isOpen = true;
        this.name = name;
        this.description = description;
        this.completeDate = completeDate;
    }

    public Milestone update(MilestoneUpdateRequest milestoneUpdateRequest) {
        this.name = milestoneUpdateRequest.name();
        this.description = milestoneUpdateRequest.description();
        this.completeDate = milestoneUpdateRequest.completeDate();

        return this;
    }

    public Milestone updateOpenState(boolean isOpen) {
        this.isOpen = isOpen;

        return this;
    }

}
