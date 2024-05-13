package team08.issuetracker.issue.model.dto;


import java.util.List;
import lombok.Getter;

@Getter
public class IssueCreationDto {
    private String title;
    private String writer; // memberId
    private String content;
    private Object mileStone;
    private List<Object> labels;
    private List<String> assignees;
    private String file;

    public IssueCreationDto(String title, String writer, String content, Object mileStone, List<Object> labels,
                            List<String> assignees, String file) {
        this.title = title;
        this.writer = writer;
        this.content = content;
        this.mileStone = mileStone;
        this.labels = labels;
        this.assignees = assignees;
        this.file = file;
    }
}
