package com.codesquad.team3.issuetracker.domain.issue.service;

import com.codesquad.team3.issuetracker.domain.assigner.AssignerRepository;
import com.codesquad.team3.issuetracker.domain.assigner.AssignerService;
import com.codesquad.team3.issuetracker.domain.comment.dto.CreateComment;
import com.codesquad.team3.issuetracker.domain.comment.service.CommentService;
import com.codesquad.team3.issuetracker.domain.issue.dto.request.CreateIssue;
import com.codesquad.team3.issuetracker.domain.issue.dto.response.IssuseResponse;
import com.codesquad.team3.issuetracker.domain.issue.entity.Issue;
import com.codesquad.team3.issuetracker.domain.issue.repository.IssueRepository;
import com.codesquad.team3.issuetracker.domain.labels.service.LabelService;
import com.codesquad.team3.issuetracker.domain.labelsinissue.LabelIssueService;
import com.codesquad.team3.issuetracker.domain.milestone.service.MilestoneService;
import com.codesquad.team3.issuetracker.global.exceptions.NoSuchRecordException;
import com.codesquad.team3.issuetracker.support.enums.OpenCloseSearchFlags;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static com.codesquad.team3.issuetracker.support.enums.OpenCloseSearchFlags.*;

@Transactional
@Service
@RequiredArgsConstructor
public class IssueServiceImpl implements IssueService {

    private final IssueRepository issueRepository;
    private final CommentService commentService;
    private final MilestoneService milestoneService;
    private final LabelService labelService;
    private final LabelIssueService labelIssueService;
    private final AssignerService assignerService;

    @Override
    public void createIssue(CreateIssue createIssue) {

        Issue issue = new Issue(
                createIssue.getWriter(),
                createIssue.getTitle(),
                LocalDateTime.now(),
                createIssue.getMilestone()
        );


        Issue insertdIssue = issueRepository.insert(issue);
        commentService.createComment(
                new CreateComment(createIssue.getWriter(),
                        createIssue.getContents(),
                        insertdIssue.getId(),
                        null));
        List<Integer> labels = createIssue.getLabels();

        putLabel(labels, insertdIssue.getId());
        putAssignee(createIssue.getAssignee(), insertdIssue.getId());
    }


    @Override
    public void open(Integer id) {
        Issue issue = issueRepository.findById(id).get();
        issueRepository.open(issue);
    }

    @Override
    public void close(Integer id) {
        Issue issue = issueRepository.findById(id).get();
        issueRepository.close(issue);
    }


    @Override
    public List<Issue> getAllIssues(int loadCount) {
        return null;
    }

    @Override
    public int getIssueCount(OpenCloseSearchFlags flags) {
        return issueRepository.countByCloseCondition(flags);

    }

    @Override
    public void openIssue(List<Integer> issueIds) throws NoSuchRecordException {
        for (Integer issueId : issueIds) {
            Optional<Issue> findIssue = issueRepository.findByIdWithOpenCondition(issueId, OPEN);
            issueRepository.open(findIssue.orElseThrow(NoSuchRecordException::new));
        }
    }

    @Override
    public void closeIssue(List<Integer> issueIds) throws NoSuchRecordException {
        for (Integer issueId : issueIds) {
            Optional<Issue> findIssue = issueRepository.findByIdWithOpenCondition(issueId, OPEN);
            issueRepository.close(findIssue.orElseThrow(NoSuchRecordException::new));
        }
    }

    @Override
    public List<Issue> getIssueByMilestoneId(Integer milestoneId) {
        return issueRepository.getIssueListByMilestoneId(milestoneId);
    }

    @Override
    public IssuseResponse getIssue(Integer id) {
//        List<Comment> comments = commentService.findComments(id);
//        Issue issue = issueRepository.findById(id).get();
//        List<Label> byIssueId = labelService.findByIssueId(id);
//        MilestoneResponse milestone = milestoneService.getMilestone(issue.getMilestoneId());

        return new IssuseResponse(null, null);
    }

    @Override
    public void putLabel(Integer LabelId) {

    }

    public void putLabel(List<Integer> Index, Integer issueId){

        for(Integer labelId : Index){
            labelIssueService.create(issueId, labelId);
        }
    }

    public void putAssignee(List<Integer> index, Integer issueId){
        for(Integer assigneeId : index){
            assignerService.create(issueId, assigneeId);
        }
    }

}
