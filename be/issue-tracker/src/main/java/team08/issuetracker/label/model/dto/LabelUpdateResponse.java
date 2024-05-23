package team08.issuetracker.label.model.dto;

import lombok.Getter;
import team08.issuetracker.label.model.Label;

@Getter
public class LabelUpdateResponse {
    Long id;
    String name;
    String message;

    public LabelUpdateResponse(Label label) {
        this.id = label.getId();
        this.name = label.getName();
        this.message = String.format("라벨수정 성공! 라벨 #%d 라벨 이름 : %s", label.getId(), label.getName());
    }

    public static LabelUpdateResponse from(Label label) {
        return new LabelUpdateResponse(label);
    }
}
