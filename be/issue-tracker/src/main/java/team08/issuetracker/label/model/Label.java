package team08.issuetracker.label.model;

import lombok.Getter;
import org.springframework.data.annotation.Id;
import team08.issuetracker.label.model.dto.LabelUpdateRequest;

@Getter
public class Label {

    @Id
    private Long id;
    private String name ;
    private String description ; // 선택
    private String backgroundColor;
    private String textColor;

    public Label(String name, String description, String backgroundColor, String textColor) {
        this.name = name;
        this.description = description;
        this.backgroundColor = backgroundColor;
        this.textColor = textColor;
    }

    public Label update(LabelUpdateRequest labelUpdateRequest){
        this.name = labelUpdateRequest.name();
        this.description = labelUpdateRequest.description();
        this.backgroundColor = labelUpdateRequest.backgroundColor();
        this.textColor = labelUpdateRequest.textColor();

        return this;
    }

    @Override
    public String toString() {
        return "Label{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", background_color='" + backgroundColor + '\'' +
                ", text_color='" + textColor + '\'' +
                '}';
    }
}
