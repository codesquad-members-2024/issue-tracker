package team08.issuetracker.milestone.service;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team08.issuetracker.exception.issue.IssueIdNotFoundException;
import team08.issuetracker.exception.milestone.InvalidMilestoneFormException;
import team08.issuetracker.exception.milestone.MilestoneQueryStateException;
import team08.issuetracker.issue.model.Issue;
import team08.issuetracker.issue.model.dto.IssueCountDto;
import team08.issuetracker.issue.repository.IssueRepository;
import team08.issuetracker.issue.service.IssueCountService;
import team08.issuetracker.milestone.model.Milestone;
import team08.issuetracker.milestone.model.dto.MilestoneCountResponse;
import team08.issuetracker.milestone.model.dto.MilestoneCreationRequest;
import team08.issuetracker.milestone.model.dto.MilestoneDetailResponse;
import team08.issuetracker.milestone.model.dto.MilestoneOverviewResponse;
import team08.issuetracker.milestone.model.dto.MilestoneSummaryDto;
import team08.issuetracker.milestone.model.dto.MilestoneUpdateRequest;
import team08.issuetracker.exception.milestone.MilestoneIdNotFoundException;
import team08.issuetracker.milestone.repository.MilestoneRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class MilestoneService {

    private final IssueCountService issueCountService;

    private final IssueRepository issueRepository;
    private final MilestoneRepository milestoneRepository;

    private static final String OPEN_STATE_QUERY = "opened";
    private static final String CLOSE_STATE_QUERY = "closed";

    public long getTotalMilestoneCounts() {
        return milestoneRepository.count();
    }

    public MilestoneSummaryDto getMilestoneSummaryDto(long id) {

        Issue issue = issueRepository.findById(id)
                .orElseThrow(IssueIdNotFoundException::new);

        Long milestoneId = issue.getMilestoneId();

        String name = Optional.ofNullable(milestoneId)
                .flatMap(milestoneRepository::findById)
                .map(Milestone::getName)
                .orElse(null);

        IssueCountDto countDto = issueCountService.getCounts(id);

        double progress = countDto.getMilestoneProgress();

        return new MilestoneSummaryDto(name, progress);
    }

    @Transactional
    public MilestoneOverviewResponse getAllMilestonesWithCounts(String state) {
        boolean openState = convertStateQueryToOpenState(state);

        List<MilestoneDetailResponse> milestoneDetailResponses = milestoneRepository.getAllMilestonesByOpenState(
                        openState)
                .stream()
                .map(this::mapToDetailResponse)
                .collect(Collectors.toList());

        return new MilestoneOverviewResponse(getMilestoneCountDto(), milestoneDetailResponses);
    }

    @Transactional
    public Milestone saveMilestone(MilestoneCreationRequest milestoneCreationRequest) {
        validateMilestoneForm(milestoneCreationRequest.name());

        Milestone milestone = milestoneCreationRequest.toEntity();

        return milestoneRepository.save(milestone);
    }


    @Transactional
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

    private MilestoneDetailResponse mapToDetailResponse(Milestone milestone) {
        IssueCountDto issueCountDto = issueCountService.getCounts(milestone.getId());
        MilestoneDetailResponse detailResponse = MilestoneDetailResponse.from(milestone);
        detailResponse.updateCount(issueCountDto);
        return detailResponse;
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
