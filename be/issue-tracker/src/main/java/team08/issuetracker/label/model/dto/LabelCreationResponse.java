package team08.issuetracker.label.model.dto;

import lombok.Getter;
import team08.issuetracker.label.model.Label;

@Getter
public class LabelCreationResponse {

    private static final String CREATE_SUCCESS_MESSAGE_FORMAT = "라벨 생성 성공! 라벨 #%d 라벨 이름 : %s";

    private final Long id;
    private final String name;
    private final String message;

    public LabelCreationResponse(Label label) {
        this.id = label.getId();
        this.name = label.getName();
        this.message = generateSuccessMessage(label);
    }

    private static String generateSuccessMessage(Label label) {
        return String.format(CREATE_SUCCESS_MESSAGE_FORMAT, label.getId(), label.getName());
    }

    public static LabelCreationResponse from(Label label) {
        return new LabelCreationResponse(label);
    }
}
