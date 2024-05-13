package com.issuetracker.domain.label.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

public class LabelResponse {

    @Getter
    @Builder
    @AllArgsConstructor
    public static class Element {
        private String labelId;
        private String description;
        private String textColor;
        private String colorCode;

        public static Element of(com.issuetracker.domain.label.Label label) {
            return Element.builder()
                    .labelId(label.getId())
                    .description(label.getDescription())
                    .textColor(label.getTextColor())
                    .colorCode(label.getColorCode())
                    .build();
        }
    }

    @Getter
    @AllArgsConstructor
    public static class Labels {
        private Integer labelCnt;
        private List<Element> elements;

        public static Labels of(List<Element> elements) {
            return new Labels(elements.size(), elements);
        }
    }
}
