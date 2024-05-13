package team08.issuetracker.label.model.dto;

import lombok.Getter;

@Getter
public class LabelCountDto {
    private long totalCount;

    public LabelCountDto(long totalCount) {
        this.totalCount = totalCount;
    }
}
