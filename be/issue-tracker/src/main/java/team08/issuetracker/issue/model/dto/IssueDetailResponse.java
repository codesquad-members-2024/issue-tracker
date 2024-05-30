package team08.issuetracker.issue.model.dto;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Getter;
import team08.issuetracker.issue.model.dto.update.AssigneeResponse;
import team08.issuetracker.label.model.dto.LabelResponse;

@Getter
public class IssueDetailResponse {
    private final long id;
    private final String title;
    private final String writer;
    private final boolean state;
    private final String milestoneName;
    private final LocalDateTime timestamp; // 형식 맞추기
    private final List<AssigneeResponse> assignees;
    private final List<LabelResponse> labels;

    private IssueDetailResponse(long id,
                                String title,
                                String writer,
                                boolean state,
                                String milestoneName,
                                LocalDateTime timestamp,
                                List<AssigneeResponse> assignees,
                                List<LabelResponse> labels) {
        this.id = id;
        this.title = title;
        this.writer = writer;
        this.state = state;
        this.milestoneName = milestoneName;
        this.timestamp = timestamp;
        this.assignees = assignees;
        this.labels = labels;
    }

    public static IssueDetailResponse of(long id,
                                         String title,
                                         String writer,
                                         boolean state,
                                         String milestoneName,
                                         LocalDateTime timestamp,
                                         List<AssigneeResponse> assignees,
                                         List<LabelResponse> labels) {

        return new IssueDetailResponse(id, title, writer, state, milestoneName, timestamp, assignees, labels);
    }
}
