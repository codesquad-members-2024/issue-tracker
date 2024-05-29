package team08.issuetracker.filter.model.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.Arrays;
import java.util.Objects;
import java.util.stream.Collectors;

@Getter
@RequiredArgsConstructor
public class FilteredIssueRequest {
    private final String target;
    private final String state;
    private final String writer;
    private final String assignee;
    private final String commenter;

    public String toQuery() {
        StringBuilder query = new StringBuilder("SELECT * FROM ");
        query.append(target);

        boolean hasCondition = false;

        if (state != null) {
            query.append(" WHERE is_open = ").append(state.equalsIgnoreCase("opened"));
            hasCondition = true;
        }
        if (writer != null) {
            query.append(hasCondition ? " AND " : " WHERE ");
            query.append("writer = '").append(writer).append("'");
            hasCondition = true;
        }
        if (assignee != null) {
            query.append(hasCondition ? " AND " : " WHERE ");
            query.append("id IN (SELECT issue_id FROM assignee WHERE member_id = '").append(assignee).append("')");
            hasCondition = true;
        }
        if (commenter != null) {
            query.append(hasCondition ? " AND " : " WHERE ");
            query.append("id IN (SELECT issue_id FROM comment WHERE writer = '").append(commenter).append("')");
        }

        return query.toString();
    }
}
