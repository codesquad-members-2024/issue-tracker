package issuetracker.be.dto;

import issuetracker.be.domain.Milestone;
import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MilestoneUpdateRequest {
  private Long id;
  private String name;
  private LocalDate end_date;
  private String description;

  public Milestone toEntity() {
    return new Milestone(id, name, description, end_date);
  }
}
