package team08.issuetracker.issue.service;

import java.util.Set;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import team08.issuetracker.exception.issue.IssueIdNotFoundException;
import team08.issuetracker.exception.label.LabelNotFoundException;
import team08.issuetracker.exception.member.MemberIdNotFoundException;
import team08.issuetracker.exception.milestone.MilestoneIdNotFoundException;
import team08.issuetracker.issue.model.Issue;
import team08.issuetracker.issue.model.dto.update.IssueAssigneeUpdateRequest;
import team08.issuetracker.issue.model.dto.update.IssueContentUpdateRequest;
import team08.issuetracker.issue.model.dto.update.IssueLabelUpdateRequest;
import team08.issuetracker.issue.model.dto.update.IssueMilestoneUpdateRequest;
import team08.issuetracker.issue.model.dto.update.IssueTitleUpdateRequest;
import team08.issuetracker.issue.repository.IssueRepository;
import team08.issuetracker.label.repository.LabelRepository;
import team08.issuetracker.member.repository.MemberRepository;
import team08.issuetracker.milestone.repository.MilestoneRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class IssueUpdateService {
    private final IssueRepository issueRepository;
    private final MemberRepository memberRepository;
    private final LabelRepository labelRepository;
    private final MilestoneRepository milestoneRepository;

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
    public Set<Long> updateMultipleIssueStateToOpen(Set<Long> ids) {
        ids.forEach(this::updateIssueStateToOpen);
        return ids;
    }

    @Transactional
    public Set<Long> updateMultipleIssueStateToClose(Set<Long> ids) {
        ids.forEach(this::updateIssueStateToClose);
        return ids;
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

        if (milestoneId != null) {
            if (!milestoneRepository.existsById(milestoneId)) {
                throw new MilestoneIdNotFoundException();
            }
        }
    }

    private Issue getIssueById(Long id) {
        return issueRepository
                .findById(id)
                .orElseThrow(IssueIdNotFoundException::new);
    }
}
