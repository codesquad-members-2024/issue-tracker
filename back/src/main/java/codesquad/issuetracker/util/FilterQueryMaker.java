package codesquad.issuetracker.util;

import codesquad.issuetracker.issue.dto.request.IssueFilterDto;
import org.springframework.stereotype.Component;

@Component
public class FilterQueryMaker {

    private String makeQueryJoin(String joinTable, String tableNickname) {
        return "JOIN " + joinTable + " " + tableNickname + " ON i.id = " + tableNickname + ".issue_id ";
    }

    private String makeQueryLeftJoin(String joinTable, String tableNickname) {
        return "LEFT JOIN " + joinTable + " " + tableNickname + " ON i.id = " + tableNickname + ".issue_id ";
    }

    private String makeQueryWhere(String requirement) {
        return " AND " + requirement;
    }

    public String makeQuery(IssueFilterDto issueFilterDto) {
        String queryStart = "SELECT i.* FROM issue i ";
        String queryJoin = "";
        String queryWhere = "WHERE";

        // Assignee 필터링 쿼리
        if (issueFilterDto.getAssignee() != null) {
            if (issueFilterDto.getAssignee().equals("-1")) {
                queryJoin += makeQueryLeftJoin("issue_assignee", "ia");
                queryWhere += makeQueryWhere("ia.login_id IS NULL");
            } else {
                queryJoin += makeQueryJoin("issue_assignee", "ia");
                queryWhere += makeQueryWhere("ia.login_id = ?");
            }
        }

        // Label 필터링 쿼리
        if (issueFilterDto.getLabelId() != null) {
            if (issueFilterDto.getLabelId() == -1) {
                queryJoin += makeQueryLeftJoin("issue_label", "il");
                queryWhere += makeQueryWhere("il.label_id IS NULL");
            } else {
                queryJoin += makeQueryJoin("issue_label", "il");
                queryWhere += makeQueryWhere("il.label_id = ?");
            }
        }

        // Milestone 필터링 쿼리
        if (issueFilterDto.getMilestoneId() != null) {
            if (issueFilterDto.getMilestoneId() == -1) {
                queryWhere += makeQueryWhere("i.milestone_id IS NULL");
            } else {
                queryWhere += makeQueryWhere("i.milestone_id = ?");
            }
        }

        // Writer 필터링 쿼리
        if (issueFilterDto.getWriter() != null) {
            queryWhere += makeQueryWhere("i.writer = ?");
        }

        return (queryStart + queryJoin + queryWhere).replaceFirst("AND", "");
    }
}