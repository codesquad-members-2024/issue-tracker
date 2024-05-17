package codesquad.issuetracker.label;

import lombok.Getter;
import org.springframework.data.annotation.Id;

@Getter
public class Label {

    @Id
    private Long id;
    private String name;
    private String description;
    private String backgroundColor;
    private String textColor;

    public Label(Long id,
                 String name,
                 String description,
                 String backgroundColor,
                 String textColor) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.backgroundColor = backgroundColor;
        this.textColor = textColor;
    }
}
