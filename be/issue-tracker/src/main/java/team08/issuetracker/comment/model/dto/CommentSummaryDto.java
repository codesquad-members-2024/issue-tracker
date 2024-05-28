package team08.issuetracker.comment.model.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

@Getter
@RequiredArgsConstructor
public class CommentSummaryDto {
    private final String writer;
    private final String content;
    private final LocalDateTime createdAt;
    private final String imageUrl;
}
