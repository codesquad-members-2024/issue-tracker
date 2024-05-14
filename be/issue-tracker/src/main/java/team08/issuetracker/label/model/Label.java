package team08.issuetracker.label.model;

import org.springframework.data.annotation.Id;

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
