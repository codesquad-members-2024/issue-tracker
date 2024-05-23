package team08.issuetracker.label.model.dto;

import lombok.Getter;
import team08.issuetracker.label.model.Label;

@Getter
public class LabelUpdateResponse {

    private static final String CREATE_SUCCESS_MESSAGE_FORMANT = "라벨수정 성공! 라벨 #%d 라벨 이름 : %s";

    Long id;
    String name;
    String message;

    public LabelUpdateResponse(Label label) {
        this.id = label.getId();
        this.name = label.getName();
        this.message = generateSuccessMessage(label);
    }

    private static String generateSuccessMessage(Label label){
        return String.format(CREATE_SUCCESS_MESSAGE_FORMANT, label.getId(), label.getName());
    }

    public static LabelUpdateResponse from(Label label) {
        return new LabelUpdateResponse(label);
    }
}
