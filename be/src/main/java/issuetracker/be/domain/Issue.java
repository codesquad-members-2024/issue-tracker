package issuetracker.be.domain;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.MappedCollection;

@Setter
@Getter
@ToString
@NoArgsConstructor
public class Issue {
  @Id
  private Long id;
  private String title;
  private String reporter;
  private Long milestone_id;
  private LocalDateTime created_at;
  private Boolean is_open = true;
  @MappedCollection(idColumn = "issue_id")
  private Set<LabelRef> labels;
  @MappedCollection(idColumn = "issue_id")
  private Set<AssigneeRef> assignees;

  public Issue(String title, String reporter,Long milestoneId, LocalDateTime createdAt, List<Long> labelIds,
      List<String> assigneeNames) {
    this.title = title;
    this.reporter = reporter;
    this.milestone_id = milestoneId;
    this.created_at = createdAt;
    this.labels = createLabelRef(labelIds);
    this.assignees = createAssigneeRef(assigneeNames);
  }

  private Set<AssigneeRef> createAssigneeRef(List<String> assigneeNames) {
    return (assigneeNames == null) ? null : assigneeNames.stream()
        .map(AssigneeRef::new)
        .collect(Collectors.toSet());
  }

  private Set<LabelRef> createLabelRef(List<Long> labelIds) {
    return (labelIds == null) ?
        null : labelIds.stream().map(LabelRef::new).collect(Collectors.toSet());
  }
}
