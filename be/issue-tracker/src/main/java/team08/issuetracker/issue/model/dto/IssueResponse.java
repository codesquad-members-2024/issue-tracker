package team08.issuetracker.issue.model.dto;

import java.util.List;
import lombok.Getter;
import team08.issuetracker.label.model.dto.LabelResponse;

// todo 열린이슈 닫힌이슈 개수
// todo 레이블개수, 마일스톤 개수

@Getter
public class IssueResponse {
    private final long id;
    private final String title;
    private final String writer;
    private final String milestoneName;
    private final String timestamp; // 형식 맞추기
    private final List<String> assigneeIds;
    private final List<LabelResponse> labels;

    private IssueResponse(long id,
                          String title,
                          String writer,
                          String milestoneName,
                          String timestamp,
                          List<String> assigneeIds,
                          List<LabelResponse> labels) {
        this.id = id;
        this.title = title;
        this.writer = writer;
        this.milestoneName = milestoneName;
        this.timestamp = timestamp;
        this.assigneeIds = assigneeIds;
        this.labels = labels;
    }

    public static IssueResponse of(long id,
                                   String title,
                                   String writer,
                                   String milestoneName,
                                   String timestamp,
                                   List<String> assigneeIds,
                                   List<LabelResponse> labels) {

        return new IssueResponse(id, title, writer, milestoneName, timestamp, assigneeIds, labels);
    }
}
