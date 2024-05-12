package codesquad.issuetracker.domain;

import lombok.Getter;
import org.springframework.data.annotation.Id;

@Getter
public class Label {

    @Id
    private String name;
    private String description;
    private String color;

//    Spring Data Jdbc의 연관관계 매핑을 위한 설정 예정
//    @MappedCollection(idColumn = "label_name", keyColumn = "name")
//    private List<IssueLabel> issues = new ArrayList<>();

    public Label(String name,
                 String description,
                 String color) {
        this.name = name;
        this.description = description;
        this.color = color;
    }
}
