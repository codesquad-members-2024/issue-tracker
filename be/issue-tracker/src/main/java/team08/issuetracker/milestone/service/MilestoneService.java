package team08.issuetracker.milestone.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import team08.issuetracker.exception.milestone.InvalidMilestoneFormException;
import team08.issuetracker.exception.milestone.MilestoneAlreadyClosedException;
import team08.issuetracker.exception.milestone.MilestoneAlreadyOpenedException;
import team08.issuetracker.exception.milestone.MilestoneNotFoundException;
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

    public MilestoneResponse getAllOpenedMilestonesWithCounts() {
        MilestoneCountDto milestoneCounts = getMilestoneCountDto();

        List<MilestoneDto> milestones = milestoneRepository.getAllOpenedMilestone().stream() // 열린 마일스톤 목록
                .map(milestone -> new MilestoneDto(
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

        return new MilestoneResponse(milestoneCounts, milestones);
    }

    public MilestoneResponse getAllClosedMilestonesWithCounts() {
        MilestoneCountDto milestoneCounts = getMilestoneCountDto();

        List<MilestoneDto> milestones = milestoneRepository.getAllClosedMilestone().stream() // 닫힌 마일스톤 목록
                .map(milestone -> new MilestoneDto(
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

        return new MilestoneResponse(milestoneCounts, milestones);
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

    public Milestone updateMilestoneState(Long id, boolean inputOpenState) {
        Milestone milestone = milestoneRepository.findById(id).orElseThrow(MilestoneNotFoundException::new);

        boolean milestoneOpenState = milestone.isOpen();    // 마일스톤의 Opened 상태 저장

        validateMilestoneState(milestoneOpenState, inputOpenState);   // 현재 마일스톤 상태와, 바꾸고자 하는 상태 비교. 같다면 Exception 발생

        milestone.updateOpenState(inputOpenState);

        return milestoneRepository.save(milestone);
    }

    public void deleteMilestone(Long id) {
        Milestone milestone = milestoneRepository.findById(id).orElseThrow(MilestoneNotFoundException::new);

        milestoneRepository.delete(milestone);
    }

    private MilestoneCountDto getMilestoneCountDto() {
        return new MilestoneCountDto(    // 마일스톤 총 개수, 열린 개수, 닫힌 개수
                milestoneRepository.count(),
                milestoneRepository.countOpenedMilestones(),
                milestoneRepository.countClosedMilestones()
        );
    }

    private void validateMilestoneState(boolean milestoneOpenState, boolean inputOpenState) {
        if (milestoneOpenState == inputOpenState) {
            throw (milestoneOpenState) ? new MilestoneAlreadyOpenedException() : new MilestoneAlreadyClosedException();
        }
    }

    private void validateMilestoneForm(String milestoneName) {
        if (milestoneName == null || milestoneName.isEmpty()) {
            throw new InvalidMilestoneFormException();
        }
    }


}
