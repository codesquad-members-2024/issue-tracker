package codesquad.issuetracker.milestone;

import codesquad.issuetracker.milestone.dto.MilestoneQueryInfo;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public interface MilestoneCustomRepository {

    List<Milestone> findFilteredMilestones(MilestoneQueryInfo milestoneQueryInfo);
}
