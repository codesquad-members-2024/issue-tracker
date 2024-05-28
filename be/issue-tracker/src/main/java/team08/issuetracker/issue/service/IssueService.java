package team08.issuetracker.issue.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team08.issuetracker.exception.issue.IssueIdNotFoundException;
import team08.issuetracker.exception.label.LabelNotFoundException;
import team08.issuetracker.exception.member.MemberIdNotFoundException;
import team08.issuetracker.exception.milestone.MilestoneIdNotFoundException;
import team08.issuetracker.exception.milestone.MilestoneQueryStateException;
import team08.issuetracker.issue.model.Issue;
import team08.issuetracker.issue.model.dto.IssueCountResponse;
import team08.issuetracker.issue.model.dto.IssueOverviewResponse;
import team08.issuetracker.issue.model.dto.IssueSummaryDto;
import team08.issuetracker.issue.model.dto.update.AssigneeResponse;
import team08.issuetracker.issue.model.dto.update.IssueAssigneeUpdateRequest;
import team08.issuetracker.issue.model.dto.update.IssueContentUpdateRequest;
import team08.issuetracker.issue.model.dto.IssueCreationRequest;
import team08.issuetracker.issue.model.dto.update.IssueLabelUpdateRequest;
import team08.issuetracker.issue.model.dto.update.IssueMilestoneUpdateRequest;
import team08.issuetracker.issue.model.dto.IssueDetailResponse;
import team08.issuetracker.issue.model.dto.update.IssueTitleUpdateRequest;
import team08.issuetracker.issue.ref.Assignee;
import team08.issuetracker.issue.ref.IssueAttachedLabel;
import team08.issuetracker.issue.repository.AssigneeRepository;
import team08.issuetracker.issue.repository.IssueAttachedLabelRepository;
import team08.issuetracker.issue.repository.IssueRepository;
import team08.issuetracker.label.model.dto.LabelResponse;
import team08.issuetracker.label.model.dto.LabelSummaryDto;
import team08.issuetracker.label.repository.LabelRepository;
import team08.issuetracker.member.model.Member;
import team08.issuetracker.member.repository.MemberRepository;
import team08.issuetracker.milestone.model.Milestone;
import team08.issuetracker.milestone.repository.MilestoneRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class IssueService {
    private final IssueRepository issueRepository;
    private final LabelRepository labelRepository;
    private final MilestoneRepository milestoneRepository;
    private final AssigneeRepository assigneeRepository;
    private final IssueAttachedLabelRepository issueAttachedLabelRepository;
    private final MemberRepository memberRepository;

    private static final String OPEN_STATE_QUERY = "opened";
    private static final String CLOSE_STATE_QUERY = "closed";

    public IssueOverviewResponse getAllIssuesWithCounts(String state) {
        boolean openState = convertStateQueryToOpenState(state);

        List<IssueDetailResponse> issueDetailResponse = new ArrayList<>();

        for (Issue issue : issueRepository.getAllIssuesByOpenState(openState)) {

            String milestoneName = getMilestoneName(issue.getMilestoneId());

            List<AssigneeResponse> assigneeResponses = getAssigneeResponses(issue);

            List<LabelResponse> labelResponses = getLabelResponses(issue);

            issueDetailResponse.add(
                    IssueDetailResponse.of(
                            issue.getId(), issue.getTitle(), issue.getWriter(), milestoneName,
                            issue.getCreatedAt(), assigneeResponses, labelResponses
                    ));
        }

        long countTotalIssues = issueRepository.countTotalIssues();
        long countOpenedIssues = issueRepository.countOpenedIssues();
        long countClosedIssues = issueRepository.countClosedIssues();

        IssueCountResponse issueCountResponse = new IssueCountResponse(countTotalIssues,
                countOpenedIssues,
                countClosedIssues);

        return new IssueOverviewResponse(issueCountResponse, issueDetailResponse);
    }

    private String getMilestoneName(Long milestoneId) {
        if (milestoneId == null) {
            return null;
        }

        return milestoneRepository.findById(milestoneId)
                .map(Milestone::getName)
                .orElse(null);
    }

    public List<AssigneeResponse> getAssigneeDto(long issueId) {
        Issue issue = getIssueById(issueId);
        return getAssigneeResponses(issue);
    }

    public List<AssigneeResponse> getAssigneeResponses(Issue issue) {
        return issue.getAssignees().stream()
                .map(Assignee::getMemberId)
                .map(memberRepository::findById)
                .filter(Optional::isPresent)
                .map(member -> new AssigneeResponse(member.get().getMemberId(), member.get().getProfileImage()))
                .toList();
    }

    public List<LabelSummaryDto> getLabelSummaryDto(long issueId) {
        Issue issue = getIssueById(issueId);
        return issue.getIssueAttachedLabels().stream()
                .map(IssueAttachedLabel::getLabelId)
                .map(labelRepository::findById)
                .filter(Optional::isPresent)
                .map(label -> new LabelSummaryDto(label.get()))
                .toList();
    }

    private List<LabelResponse> getLabelResponses(Issue issue) {
        return issue.getIssueAttachedLabels().stream()
                .map(IssueAttachedLabel::getLabelId)
                .map(labelRepository::findById)
                .filter(Optional::isPresent)
                .map(label -> new LabelResponse(label.get()))
                .toList();
    }

    public IssueSummaryDto getIssueSummaryDto(long issueId) {
        Issue issue = issueRepository
                .findById(issueId)
                .orElseThrow(IssueIdNotFoundException::new);

        //memberService.getImageUrl 로 변경 예정
        Member member = memberRepository
                .findById(issue.getWriter())
                .orElseThrow(MemberIdNotFoundException::new);

        String profileImage = member.getProfileImage();

        return IssueSummaryDto.from(issue, profileImage);
    }

    @Transactional
    public Issue createNewIssue(IssueCreationRequest issueCreationRequest) {

        // 다대다 관계를 갖는 assignee 를 제외한 값으로 issue 생성
        Issue issue = issueCreationRequest.createIssue();
        Issue savedIssue = issueRepository.save(issue); // db에 저장하여 id(pk) 값이 autoIncrement 로 설정된 객체를 반환 받는다

        //다대다 관계 설정
        Set<Assignee> assignees = issueCreationRequest.createAssigneesWithIssueId(savedIssue.getId());
        assigneeRepository.saveAll(assignees);

        Set<IssueAttachedLabel> issueAttachedLabels = issueCreationRequest.createIssueAttachedLabelsWithIssueId(
                savedIssue.getId());
        issueAttachedLabelRepository.saveAll(issueAttachedLabels);

        savedIssue.setAssignees(assignees);
        savedIssue.setIssueAttachedLabels(issueAttachedLabels);
        log.info("SAVED ISSUE : {}", savedIssue);

        return savedIssue;
    }

    @Transactional
    public Issue updateIssueTitle(Long id, IssueTitleUpdateRequest issueTitleUpdateRequest) {
        Issue issue = getIssueById(id);

        issue.updateTitle(issueTitleUpdateRequest);

        return issueRepository.save(issue);
    }

    @Transactional
    public Issue updateIssueContent(Long id, IssueContentUpdateRequest issueContentUpdateRequest) {
        Issue issue = getIssueById(id);

        issue.updateContent(issueContentUpdateRequest);

        return issueRepository.save(issue);
    }

    @Transactional
    public Issue updateIssueAssignee(Long id, IssueAssigneeUpdateRequest issueAssigneeUpdateRequest) {
        Issue issue = getIssueById(id);

        validateAssigneeIds(issueAssigneeUpdateRequest);

        issue.updateAssignee(issueAssigneeUpdateRequest);

        return issueRepository.save(issue);
    }

    @Transactional
    public Issue updateIssueLabel(Long id, IssueLabelUpdateRequest issueLabelUpdateRequest) {
        Issue issue = getIssueById(id);

        validateLabelIds(issueLabelUpdateRequest);

        issue.updateIssueAttachedLabel(issueLabelUpdateRequest);

        return issueRepository.save(issue);
    }

    @Transactional
    public Issue updateIssueMilestone(Long id, IssueMilestoneUpdateRequest issueMilestoneUpdateRequest) {
        Issue issue = getIssueById(id);

        validateMilestoneId(issueMilestoneUpdateRequest);

        issue.updateMilestone(issueMilestoneUpdateRequest);

        return issueRepository.save(issue);
    }

    @Transactional
    public Issue updateIssueStateToOpen(Long id) {
        Issue issue = getIssueById(id);

        issue.open();

        return issueRepository.save(issue);
    }

    @Transactional
    public Issue updateIssueStateToClose(Long id) {
        Issue issue = getIssueById(id);

        issue.close();

        return issueRepository.save(issue);
    }

    @Transactional
    public void deleteIssue(Long id) {
        Issue issue = getIssueById(id);
        issueRepository.delete(issue);
    }

    private Issue getIssueById(Long id) {
        return issueRepository
                .findById(id)
                .orElseThrow(IssueIdNotFoundException::new);
    }

    private void validateAssigneeIds(IssueAssigneeUpdateRequest issueAssigneeUpdateRequest) {
        boolean memberNotFound = issueAssigneeUpdateRequest.assigneeIds().stream()
                .anyMatch(assigneeId -> !memberRepository.existsById(assigneeId));

        if (memberNotFound) {
            throw new MemberIdNotFoundException();
        }
    }

    private void validateLabelIds(IssueLabelUpdateRequest issueLabelUpdateRequest) {
        boolean labelNotFound = issueLabelUpdateRequest.labelIds().stream()
                .anyMatch(labelId -> !labelRepository.existsById(labelId));

        if (labelNotFound) {
            throw new LabelNotFoundException();
        }
    }

    private void validateMilestoneId(IssueMilestoneUpdateRequest issueMilestoneUpdateRequest) {
        Long milestoneId = issueMilestoneUpdateRequest.milestoneId();

        if (!milestoneRepository.existsById(milestoneId)) {
            throw new MilestoneIdNotFoundException();
        }
    }

    private boolean convertStateQueryToOpenState(String state) {
        if (state == null || state.equals(OPEN_STATE_QUERY)) {
            return true;
        }
        if (state.equals(CLOSE_STATE_QUERY)) {
            return false;
        }
        throw new MilestoneQueryStateException(); // todo Exception 바꿔야함
    }
}
