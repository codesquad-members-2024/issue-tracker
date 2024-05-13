package team08.issuetracker.issue.model.dto;


import java.util.List;

/**
 * 클라이언트로 부터 받을 수 있는 모든 값들
 *
 * @param title Non-Null
 * @param writer Non-Null
 * @param content Nullable
 * @param mileStone Nullable
 * @param labels Nullable
 * @param assignees Nullable
 * @param file Nullable
 */
public record IssueCreationDto(String title, String writer, String content, Object mileStone,
                               List<Object> labels, List<String> assignees, String file) {
}
