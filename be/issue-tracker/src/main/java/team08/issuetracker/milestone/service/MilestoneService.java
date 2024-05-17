package team08.issuetracker.milestone.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import team08.issuetracker.exception.milestone.*;
import team08.issuetracker.milestone.model.Milestone;
import team08.issuetracker.milestone.model.dto.*;
import team08.issuetracker.milestone.repository.MilestoneRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class MilestoneService {
    private final MilestoneRepository milestoneRepository;

    private static final boolean OPEN_STATE = true;
    private static final boolean CLOSE_STATE = false;
    private static final String OPEN_STATE_QUERY = "opened";
    private static final String CLOSE_STATE_QUERY = "closed";

    public MilestoneOverviewDto getAllMilestonesWithCounts(String state) {
        boolean openState = convertStateQueryToOpenState(state);

        List<MilestoneDetailDto> milestones = milestoneRepository.getAllMilestonesByOpenState(openState).stream()
                .map(milestone -> new MilestoneDetailDto(
                        milestone.getId(),
                        milestone.getName(),
                        milestone.getCompleteDate(),
                        milestone.getDescription()))
                /* TODO : 마일스톤과 이슈간의 연관된 정보 추가하기
                1) openedIssueCount : 마일스톤에 해당하는 열린 이슈 개수 [long]
                2) closedIssueCount : 마일스톤에 해당하는 닫힌 이슈 개수 [long]
                3) milestoneProgress : 마일스톤 진행도 [double]
                 */
                .collect(Collectors.toList());

        return new MilestoneOverviewDto(getMilestoneCountDto(), milestones);
    }

    public Milestone saveMilestone(MilestoneCreationDto milestoneCreationDto) {
        validateMilestoneForm(milestoneCreationDto.name());

        Milestone milestone = new Milestone(milestoneCreationDto.name(), milestoneCreationDto.description(), milestoneCreationDto.completeDate());

        return milestoneRepository.save(milestone);
    }

    public Milestone updateMilestone(Long id, MilestoneUpdateDto milestoneUpdateDto) {
        validateMilestoneForm(milestoneUpdateDto.name());

        Milestone milestone = milestoneRepository.findById(id).orElseThrow(MilestoneNotFoundException::new);

        milestone.update(milestoneUpdateDto);

        return milestoneRepository.save(milestone);
    }

    public Milestone updateMilestoneStateToOpen(Long id) {
        Milestone milestone = milestoneRepository.findById(id).orElseThrow(MilestoneNotFoundException::new);

        if (milestone.isOpen()) {
            throw new MilestoneAlreadyOpenedException();
        }

        milestone.updateOpenState(OPEN_STATE);

        return milestoneRepository.save(milestone);
    }

    public Milestone updateMilestoneStateToClose(Long id) {
        Milestone milestone = milestoneRepository.findById(id).orElseThrow(MilestoneNotFoundException::new);

        if (!milestone.isOpen()) {
            throw new MilestoneAlreadyClosedException();
        }

        milestone.updateOpenState(CLOSE_STATE);

        return milestoneRepository.save(milestone);
    }


    public void deleteMilestone(Long id) {
        Milestone milestone = milestoneRepository.findById(id).orElseThrow(MilestoneNotFoundException::new);

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

    private MilestoneCountDto getMilestoneCountDto() {
        return new MilestoneCountDto(    // 마일스톤 총 개수, 열린 개수, 닫힌 개수
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
