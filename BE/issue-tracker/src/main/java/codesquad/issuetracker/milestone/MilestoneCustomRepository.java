package codesquad.issuetracker.milestone;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface MilestoneCustomRepository {

    Page<Milestone> findAll(Pageable pageable);

//    void softDeleteByMilestoneId(Long milestoneId);

}
