package com.issuetracker.domain.issue;

import com.issuetracker.domain.issue.request.IssueSearchCondition;

import java.util.Arrays;
import java.util.HashMap;

import com.issuetracker.domain.issue.response.*;

import com.issuetracker.global.exception.issue.IssueNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Map;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class IssueService {

    private final IssueRepository issueRepository;
    private final IssueMapper issueMapper;
    private final IssueViewMapper issueViewMapper;

    public Long create(Issue issue) {
        Issue savedIssue = issueRepository.save(issue);
        return savedIssue.getId();
    }

    @Transactional(readOnly = true)
    public IssueDetailsResponse getDetail(Long issueId) {
        if (!issueRepository.existsById(issueId)) {
            throw new IssueNotFoundException();
        }

        IssueDetails issueDetails = issueViewMapper.findById(issueId);
        return IssueDetailsResponse.of(issueDetails);
    }

    public void delete(Long issueId) {
        issueRepository.deleteById(issueId);
    }

    public void edit(Map<String, Object> form) {
        issueMapper.update(form);
    }

    public void updateStatus(String issueIdString, boolean openStatus) {
        List<Long> issueIds = Arrays.stream(issueIdString.split(","))
                .map(String::trim)
                .map(Long::parseLong)
                .toList();

        issueRepository.updateOpenStatus(issueIds, openStatus);
    }

    public void addAssignee(Long issueId, String memberId) {
        Issue issue = issueRepository.findById(issueId).orElseThrow(IssueNotFoundException::new);
        issue.addAssignee(memberId);

        issueRepository.save(issue);
    }

    public void addAssignees(Long issueId, List<String> memberIds) {
        Issue issue = issueRepository.findById(issueId).orElseThrow(IssueNotFoundException::new);
        issue.addAssignees(memberIds);

        issueRepository.save(issue);
    }

    public void deleteAssignee(Long issueId, String memberId) {
        Issue issue = issueRepository.findById(issueId).orElseThrow(IssueNotFoundException::new);
        issue.deleteAssignee(memberId);

        issueRepository.save(issue);
    }

    public void addLabel(Long issueId, String labelId) {
        Issue issue = issueRepository.findById(issueId).orElseThrow(IssueNotFoundException::new);
        issue.addLabel(labelId);

        issueRepository.save(issue);
    }

    public void addLabels(Long issueId, List<String> labelIds) {
        Issue issue = issueRepository.findById(issueId).orElseThrow(IssueNotFoundException::new);
        issue.addLabels(labelIds);

        issueRepository.save(issue);
    }

    public void deleteLabel(Long issueId, String labelId) {
        Issue issue = issueRepository.findById(issueId).orElseThrow(IssueNotFoundException::new);
        issue.deleteLabel(labelId);

        issueRepository.save(issue);
    }

    public void assignMilestone(Long issueId, String milestoneId) {
        Issue issue = issueRepository.findById(issueId).orElseThrow(IssueNotFoundException::new);
        issue.assignMilestone(milestoneId);

        issueRepository.save(issue);
    }

    public Issue deleteMilestone(Long issueId) {
        Issue issue = issueRepository.findById(issueId).orElseThrow(IssueNotFoundException::new);
        issue.deleteMilestone();

        return issueRepository.save(issue);
    }

    @Transactional(readOnly = true)
    public IssueListResponse getIssuesByCondition(IssueSearchCondition condition) {
        Map<String, Object> conditionMap = new HashMap<>();

        conditionMap.put("author", condition.getAuthor());
        conditionMap.put("isOpen", condition.isOpen());
        conditionMap.put("milestoneId", condition.getMilestoneId());
        conditionMap.put("labelIds", condition.getLabelIds());
        conditionMap.put("keyword", condition.getKeyword());
        conditionMap.put("assignees", condition.getAssignees());
        conditionMap.put("noAssignee", condition.isNoAssignee());
        conditionMap.put("noMilestone", condition.isNoMilestone());

        IssueCount issueCount = issueViewMapper.countByCondition(conditionMap);
        List<SimpleIssue> issues = issueViewMapper.findAllByCondition(conditionMap);

        return IssueListResponse.from(issueCount, issues);
    }
}