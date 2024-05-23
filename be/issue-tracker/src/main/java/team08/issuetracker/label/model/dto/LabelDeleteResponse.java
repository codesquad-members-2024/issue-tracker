package team08.issuetracker.label.model.dto;

import lombok.Getter;

@Getter
public class LabelDeleteResponse {

    private static final String CREATE_SUCCESS_MESSAGE_FORMAT = "라벨 삭제 성공! 라벨 #%d";

    private final long id;
    private final String message;

    public LabelDeleteResponse(long id) {
        this.id = id;
        this.message = generateSuccessMessage(id);
    }

    private static String generateSuccessMessage(long id) {
        return String.format(CREATE_SUCCESS_MESSAGE_FORMAT, id);
    }

    public static LabelDeleteResponse from(long id){
        return new LabelDeleteResponse(id);
    }
}
