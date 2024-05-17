package codesquad.issuetracker.label;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
@Setter
@NoArgsConstructor
public class LabelUpdateDto {
    @Id
    private String name;
    private String description;
    private String backgroundColor;
    private String textColor;
}
