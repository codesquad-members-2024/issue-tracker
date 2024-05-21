package team08.issuetracker.milestone.model;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import team08.issuetracker.exception.milestone.MilestoneAlreadyClosedException;
import team08.issuetracker.exception.milestone.MilestoneAlreadyOpenedException;
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

    public void open() {
        if (this.isOpen) {
            throw new MilestoneAlreadyOpenedException();
        }
        this.isOpen = true;
    }

    public void close() {
        if (!this.isOpen) {
            throw new MilestoneAlreadyClosedException();
        }
        this.isOpen = false;
    }

}
