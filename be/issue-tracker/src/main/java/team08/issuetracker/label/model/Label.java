package team08.issuetracker.label.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import team08.issuetracker.label.model.dto.LabelUpdateRequest;

@Getter
@Setter
@NoArgsConstructor
public class Label {

    @Id
    private Long id;
    private String name ;
    private String description ; // 선택
    private String backgroundColor;
    private Boolean textBright;

    public Label(String name, String description, String backgroundColor, Boolean textBright) {
        this.name = name;
        this.description = description;
        this.backgroundColor = backgroundColor;
        this.textBright = textBright;
    }

    public Label update(LabelUpdateRequest labelUpdateRequest){
        this.name = labelUpdateRequest.name();
        this.description = labelUpdateRequest.description();
        this.backgroundColor = labelUpdateRequest.backgroundColor();
        this.textBright = labelUpdateRequest.textBright();

        return this;
    }

    @Override
    public String toString() {
        return "Label{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", background_color='" + backgroundColor + '\'' +
                ", text_color='" + textBright + '\'' +
                '}';
    }
}
