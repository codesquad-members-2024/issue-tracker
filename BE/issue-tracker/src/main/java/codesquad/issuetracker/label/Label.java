package codesquad.issuetracker.label;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.PersistenceCreator;

@Getter
public class Label {

    @Id
    private Long id;
    private String name;
    private String description;
    private String color;
    private boolean isDeleted;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Builder
    @PersistenceCreator
    public Label(Long id, String name, String description, String color, boolean isDeleted,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.color = color;
        this.isDeleted = isDeleted;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}
