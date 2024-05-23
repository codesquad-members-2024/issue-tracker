package team08.issuetracker.label.model.dto;

import lombok.Getter;

@Getter
public class LabelDeleteResponse {
    private final long id;
    private final String message;

    public LabelDeleteResponse(long id) {
        this.id = id;
        this.message = String.format("라벨 삭제 성공! 라벨 #%d", id);
    }

    public static LabelDeleteResponse from(long id){
        return new LabelDeleteResponse(id);
    }
}
