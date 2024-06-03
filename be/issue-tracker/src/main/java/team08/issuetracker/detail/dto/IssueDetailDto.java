package team08.issuetracker.detail.dto;

import lombok.Getter;
import team08.issuetracker.comment.model.dto.CommentSummaryDto;
import team08.issuetracker.issue.model.dto.IssueSummaryDto;
import team08.issuetracker.issue.model.dto.update.AssigneeResponse;
import team08.issuetracker.label.model.dto.LabelSummaryDto;

import java.util.List;
import team08.issuetracker.milestone.model.dto.MilestoneSummaryDto;

@Getter
public class IssueDetailDto {
    private final IssueSummaryDto issue;
    private final List<AssigneeResponse> assignees;
    private final List<LabelSummaryDto> labels;
    private final List<CommentSummaryDto> comments;
    private final MilestoneSummaryDto milestone;

    private IssueDetailDto(IssueSummaryDto issue,
                           List<AssigneeResponse> assignees,
                           List<LabelSummaryDto> labels,
                           List<CommentSummaryDto> comments,
                           MilestoneSummaryDto milestone) {
        this.issue = issue;
        this.assignees = assignees;
        this.labels = labels;
        this.comments = comments;
        this.milestone = milestone;
    }

    public static IssueDetailDto from(IssueSummaryDto issue,
                                      List<AssigneeResponse> assignees,
                                      List<LabelSummaryDto> labels,
                                      List<CommentSummaryDto> comments,
                                      MilestoneSummaryDto milestone) {

        return new IssueDetailDto(issue, assignees, labels, comments, milestone);
    }
}
