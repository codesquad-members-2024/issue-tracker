package team08.issuetracker.filter.service;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import team08.issuetracker.filter.model.dto.FilteredIssueRequest;
import team08.issuetracker.filter.model.dto.FilteredIssueResponse;
import team08.issuetracker.issue.model.Issue;
import team08.issuetracker.issue.model.dto.IssueDetailResponse;
import team08.issuetracker.issue.model.dto.update.AssigneeResponse;
import team08.issuetracker.label.model.Label;
import team08.issuetracker.label.model.dto.LabelResponse;
import team08.issuetracker.milestone.model.Milestone;
import team08.issuetracker.milestone.repository.MilestoneRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FilterService {
    private static final String labelQuery = "SELECT label.id, label.name, label.background_color, label.description, label.text_bright " +
            "FROM issue " +
            "JOIN issue_attached_label ON issue.id = issue_attached_label.issue_id " +
            "JOIN label ON issue_attached_label.label_id = label.id " +
            " WHERE issue.id = ?";

    private static final String assigneeQuery = "SELECT member.member_id, member.profile_image " +
            "FROM issue " +
            "JOIN assignee ON issue.id = assignee.issue_id " +
            "JOIN member ON assignee.member_id = member.member_id " +
            "WHERE issue.id = ?";

    private final JdbcTemplate jdbcTemplate;

    private final MilestoneRepository milestoneRepository;

    public FilteredIssueResponse getFilteredIssues(FilteredIssueRequest request) {
        List<IssueDetailResponse> detailIssues = new ArrayList<>();

        List<Issue> issues = getIssuesFromQuery(request.toQuery());

        for (Issue issue : issues) {

            List<LabelResponse> labels = getIssueAttachedLabels(issue.getId());
            List<AssigneeResponse> assignees = getAssignees(issue.getId());

            IssueDetailResponse detailIssue = IssueDetailResponse.of(
                    issue.getId(),
                    issue.getTitle(),
                    issue.getWriter(),
                    issue.isOpen(),
                    getMilestoneName(issue.getMilestoneId()),
                    issue.getCreatedAt(),
                    assignees,
                    labels
            );
            detailIssues.add(detailIssue);
        }

        return new FilteredIssueResponse(detailIssues);
    }


    private List<Issue> getIssuesFromQuery(String query) {
        return jdbcTemplate.query(query, (rs, rowNum) -> {
            Issue issue = new Issue();
            issue.setId(rs.getLong("id"));
            issue.setTitle(rs.getString("title"));
            issue.setWriter(rs.getString("writer"));
            issue.setOpen(rs.getBoolean("is_open"));
            issue.setMilestoneId(rs.getLong("milestone_id"));
            issue.setCreatedAt(rs.getTimestamp("created_at").toLocalDateTime());
            return issue;
        });
    }


    private List<LabelResponse> getIssueAttachedLabels(long issueId) {
        return jdbcTemplate.query(
                labelQuery,
                new Object[]{issueId},
                (rs, rowNum) -> {
                    Label label = new Label();
                    label.setId(rs.getLong("id"));
                    label.setName(rs.getString("name"));
                    label.setBackgroundColor(rs.getString("background_color"));
                    label.setDescription(rs.getString("description"));
                    label.setTextBright(rs.getBoolean("text_bright"));
                    return new LabelResponse(label);
                }
        );
    }

    private List<AssigneeResponse> getAssignees(long issueId) {
        return jdbcTemplate.query(
                assigneeQuery,
                new Object[]{issueId},
                (rs, rowNum) -> {
                    AssigneeResponse assignee = new AssigneeResponse(
                            rs.getString("member_id"),
                            rs.getString("profile_image")
                    );
                    return assignee;
                }
        );
    }

    private String getMilestoneName(long milestoneId) {
        Optional<Milestone> milestone = milestoneRepository.findById(milestoneId);
        return milestone.map(Milestone::getName).orElse(null);
    }

}
