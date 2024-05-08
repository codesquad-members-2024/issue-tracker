package codesquad.issuetracker.domain;

public class Label {

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
