package codesquad.issuetracker.util;

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
}