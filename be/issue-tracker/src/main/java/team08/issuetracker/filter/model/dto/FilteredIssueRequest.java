package team08.issuetracker.filter.model.dto;

public record FilteredIssueRequest(
        String target,
        String state,
        String writer,
        String assignee,
        String commenter,
        Long labelId,
        Long milestoneId
) {
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
            if (assignee.isEmpty()) {
                query.append("id NOT IN (SELECT issue_id FROM assignee)");
            } else {
                query.append("id IN (SELECT issue_id FROM assignee WHERE member_id = '").append(assignee).append("')");
            }
            hasCondition = true;
        }

        if (commenter != null) {
            query.append(hasCondition ? " AND " : " WHERE ");
            query.append("id IN (SELECT issue_id FROM comment WHERE writer = '").append(commenter).append("')");
            hasCondition = true;
        }

        if (labelId != null) {
            query.append(hasCondition ? " AND " : " WHERE ");
            if (labelId == 0) {
                query.append("id NOT IN (SELECT issue_id FROM issue_attached_label)");
            } else {
                query.append("id IN (SELECT issue_id FROM issue_attached_label WHERE label_id = '").append(labelId).append("')");
            }
            hasCondition = true;  // 플래그 업데이트 추가
        }

        if (milestoneId != null) {
            query.append(hasCondition ? " AND " : " WHERE ");
            if (milestoneId == 0) {
                query.append("milestone_id IS NULL");
            } else {
                query.append("milestone_id = ").append(milestoneId);
            }
        }

        return query.toString();
    }
}
