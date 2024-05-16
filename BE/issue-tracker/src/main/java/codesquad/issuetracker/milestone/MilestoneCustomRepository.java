package codesquad.issuetracker.milestone;

import codesquad.issuetracker.milestone.dto.MilestoneQueryInfo;
import java.util.List;

public interface MilestoneCustomRepository {

    List<Milestone> findFilteredMilestones(MilestoneQueryInfo milestoneQueryInfo);

    void softDeleteByMilestoneId(Long milestoneId);

}
