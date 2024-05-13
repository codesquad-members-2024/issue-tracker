package com.issuetracker.domain.label.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class LabelListResponse {
    private List<LabelResponse> elements;

    public static LabelListResponse of (List<LabelResponse> elements) {
        return new LabelListResponse(elements);
    }
}
