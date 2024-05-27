package team08.issuetracker.comment.model.dto;

public record CommentUpdateRequest(
        String content,
        String uploadedFile) {
}
