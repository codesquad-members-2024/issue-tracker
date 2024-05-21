package team08.issuetracker.milestone.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team08.issuetracker.exception.milestone.InvalidMilestoneFormException;
import team08.issuetracker.exception.milestone.MilestoneQueryStateException;
import team08.issuetracker.milestone.model.Milestone;
import team08.issuetracker.milestone.model.dto.MilestoneCountResponse;
import team08.issuetracker.milestone.model.dto.MilestoneCreationRequest;
import team08.issuetracker.milestone.model.dto.MilestoneDetailResponse;
import team08.issuetracker.milestone.model.dto.MilestoneOverviewResponse;
import team08.issuetracker.milestone.model.dto.MilestoneUpdateRequest;
import team08.issuetracker.exception.milestone.MilestoneIdNotFoundException;
import team08.issuetracker.milestone.repository.MilestoneRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class MilestoneService {
    private final MilestoneRepository milestoneRepository;


    private static final String OPEN_STATE_QUERY = "opened";
    private static final String CLOSE_STATE_QUERY = "closed";

    public MilestoneOverviewResponse getAllMilestonesWithCounts(String state) {
        boolean openState = convertStateQueryToOpenState(state);

        List<MilestoneDetailResponse> milestones = milestoneRepository.getAllMilestonesByOpenState(openState).stream()
                .map(MilestoneDetailResponse::from)
                /* TODO : 마일스톤과 이슈간의 연관된 정보 추가하기
                1) openedIssueCount : 마일스톤에 해당하는 열린 이슈 개수 [long]
                2) closedIssueCount : 마일스톤에 해당하는 닫힌 이슈 개수 [long]
                3) milestoneProgress : 마일스톤 진행도 [double]
                 */
                .collect(Collectors.toList());


        return new MilestoneOverviewResponse(getMilestoneCountDto(), milestones);
    }

    public Milestone saveMilestone(MilestoneCreationRequest milestoneCreationRequest) {
        validateMilestoneForm(milestoneCreationRequest.name());

        Milestone milestone = milestoneCreationRequest.toEntity();

        return milestoneRepository.save(milestone);
    }


    public Milestone updateMilestone(Long id, MilestoneUpdateRequest milestoneUpdateRequest) {
        validateMilestoneForm(milestoneUpdateRequest.name());

        Milestone milestone = milestoneRepository
                .findById(id)
                .orElseThrow(MilestoneIdNotFoundException::new);

        milestone.update(milestoneUpdateRequest);

        return milestoneRepository.save(milestone);
    }


    @Transactional
    public Milestone updateMilestoneStateToOpen(Long id) {
        Milestone milestone = milestoneRepository
                .findById(id)
                .orElseThrow(MilestoneIdNotFoundException::new);

        milestone.open();
        return milestoneRepository.save(milestone);
    }

    @Transactional
    public Milestone updateMilestoneStateToClose(Long id) {
        Milestone milestone = milestoneRepository
                .findById(id)
                .orElseThrow(MilestoneIdNotFoundException::new);

        milestone.close();
        return milestoneRepository.save(milestone);
    }


    public void deleteMilestone(Long id) {

        Milestone milestone = milestoneRepository.findById(id).orElseThrow(MilestoneIdNotFoundException::new);

        milestoneRepository.delete(milestone);
    }

    private boolean convertStateQueryToOpenState(String state) {
        if (state == null || state.equals(OPEN_STATE_QUERY)) {
            return true;
        }
        if (state.equals(CLOSE_STATE_QUERY)) {
            return false;
        }
        throw new MilestoneQueryStateException();
    }


    private MilestoneCountResponse getMilestoneCountDto() {
        return new MilestoneCountResponse(    // 마일스톤 총 개수, 열린 개수, 닫힌 개수
                milestoneRepository.count(),
                milestoneRepository.countOpenedMilestones(),
                milestoneRepository.countClosedMilestones()
        );
    }

    private void validateMilestoneForm(String milestoneName) {
        if (milestoneName == null || milestoneName.isEmpty()) {
            throw new InvalidMilestoneFormException();
        }
    }
}
