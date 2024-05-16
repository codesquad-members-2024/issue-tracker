package codesquad.issuetracker.label;

import lombok.Getter;
import org.springframework.data.annotation.Id;

@Getter
public class Label {

    @Id
    private String name;
    private String description;
    private String color;

    public Label(String name,
                 String description,
                 String color) {
        this.name = name;
        this.description = description;
        this.color = color;
    }
}
