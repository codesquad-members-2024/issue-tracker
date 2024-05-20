package codesquad.issuetracker.label;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Table("LABEL")
public class Label {
    @Id
    private Long id;
    private String name;
    private String description;
    private TextColor textColor;
    private String backgroundColor;
    private boolean isDeleted;

    @Builder
    @PersistenceCreator
    public Label(Long id, String name, String description, TextColor textColor, String backgroundColor, boolean isDeleted) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.textColor = textColor;
        this.backgroundColor = backgroundColor;
        this.isDeleted = isDeleted;
    }

}
