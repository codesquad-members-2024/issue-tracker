package team08.issuetracker.detail.dto;

import team08.issuetracker.comment.model.dto.CommentSummaryDto;
import team08.issuetracker.label.model.dto.LabelSummaryDto;

import java.util.List;

public class IssueDetailDto {
    private List<LabelSummaryDto> labels;
    private List<CommentSummaryDto> comments;
}
