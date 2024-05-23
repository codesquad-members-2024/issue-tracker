package team08.issuetracker.label.model.dto;

import lombok.Getter;
import team08.issuetracker.label.model.Label;

@Getter
public class LabelCreationResponse {
    private final Long id;
    private final String name;
    private final String message;

    public LabelCreationResponse(Label label) {
        this.id = label.getId();
        this.name = label.getName();
        this.message = String.format("라벨생성 성공! 라벨 #%d 라벨 이름 : %s", label.getId(), label.getName());
    }

    public static LabelCreationResponse from(Label label) {
        return new LabelCreationResponse(label);
    }
}
