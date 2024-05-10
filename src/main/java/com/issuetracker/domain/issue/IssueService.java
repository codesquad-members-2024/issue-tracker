package com.issuetracker.domain.issue;

import com.issuetracker.domain.issue.request.IssueCreateRequest;
import com.issuetracker.domain.issue.request.IssueUpdateRequest;
import lombok.RequiredArgsConstructor;
import com.issuetracker.domain.issue.response.IssueDetailResponse;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IssueService {

    private final IssueRepository issueRepository;
    private final IssueMapper issueMapper;

    public Long create(IssueCreateRequest request) {
        Issue issue = request.toEntity();
        Issue savedIssue = issueRepository.save(issue);
        return savedIssue.getId();
    }

    public IssueDetailResponse getDetail(Long issueId) {
         Issue issue = issueRepository.findById(issueId).orElseThrow(RuntimeException::new);
         return IssueDetailResponse.builder()
                 .memberId(issue.getMemberId())
                 .title(issue.getTitle())
                 .content(issue.getContent())
                 .build();
    }

    public void edit(IssueUpdateRequest form) {
        if (form.getTitle() == null && form.getContent() == null) {
            throw new IllegalArgumentException();
        }
        issueMapper.update(form);
    }
}