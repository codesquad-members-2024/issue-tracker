package team08.issuetracker.label.model;

import org.springframework.data.annotation.Id;

public class Label {

    @Id
    private Long id;
    private String name ;
    private String description ; // 선택
    private String background_color;
    private String text_color;

    public Label(String name, String description, String background_color, String text_color) {
        this.name = name;
        this.description = description;
        this.background_color = background_color;
        this.text_color = text_color;
    }

    @Override
    public String toString() {
        return "Label{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", background_color='" + background_color + '\'' +
                ", text_color='" + text_color + '\'' +
                '}';
    }
}
