package com.CodeSquad.IssueTracker.milestone;

import com.CodeSquad.IssueTracker.Exception.milestone.InvalidMilestoneRequestException;
import com.CodeSquad.IssueTracker.Exception.milestone.MilestoneNotFoundException;
import com.CodeSquad.IssueTracker.milestone.dto.MilestoneRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

import static com.CodeSquad.IssueTracker.milestone.utils.TimestampParser.parseDeadline;

@Slf4j
@Service
public class MilestoneService {
    private final MilestoneRepository milestoneRepository;

    public MilestoneService(MilestoneRepository milestoneRepository) {
        this.milestoneRepository = milestoneRepository;
    }

    public void createMilestone(MilestoneRequest milestoneRequest) {
        log.info("마일스톤 생성 요청: {}", milestoneRequest);
        validateMilestoneRequest(milestoneRequest);

        Timestamp timestamp;
        try {
            timestamp= parseDeadline(milestoneRequest.getDeadline());
        }catch (IllegalArgumentException  e){
            log.error("마감일 형식이 잘못되었습니다: {}", milestoneRequest.getDeadline(), e);
            throw new InvalidMilestoneRequestException("Invalid deadline format");
        }

        Milestone milestone = new Milestone(
                milestoneRequest.getMilestoneId(),
                milestoneRequest.getTitle(),
                milestoneRequest.getDescription(),
                timestamp,
                milestoneRequest.getTotalIssue(),
                milestoneRequest.getClosedIssue());

        milestoneRepository.save(milestone);
        log.info("마일스톤 생성 완료: {}", milestone);
    }

    public void deleteMilestone(Long milestoneId) {
        log.info("마일스톤 삭제 요청: {}", milestoneId);
        Milestone milestone = getMilestoneById(milestoneId);

        milestoneRepository.delete(milestone);
        log.info("마일스톤 삭제 완료: {}", milestone);
    }

    public Milestone getMilestoneById(Long milestoneId) {
        log.info("마일스톤 조회 요청: {}", milestoneId);
        return milestoneRepository.findById(milestoneId)
                .orElseThrow(() -> {
                    log.error("해당 마일스톤이 존재하지 않습니다: {}", milestoneId);
                    return new MilestoneNotFoundException("해당 마일스톤이 존재하지 않습니다: " + milestoneId);
                });
    }

    public List<Milestone> getOpenMilestones() {
        log.info("열린 마일스톤 조회 요청");
        return milestoneRepository.findAllOpenMilestones();
    }

    public List<Milestone> getCloseMilestones() {
        log.info("닫힌 마일스톤 조회 요청");
        return milestoneRepository.findAllCloseMilestones();
    }

    private void validateMilestoneRequest(MilestoneRequest milestoneRequest) {
        if (milestoneRequest.getTitle().isEmpty()) {
            log.error("제목이 비어있습니다: {}", milestoneRequest);
            throw new InvalidMilestoneRequestException("제목이 비어있습니다");
        }
    }

    public void editMilestone(Long milestoneId, MilestoneRequest milestoneRequest) {
        validateMilestoneRequest(milestoneRequest);
        Milestone milestone = getMilestoneById(milestoneId);

        log.info("마일스톤 편집 milestone: {}", milestoneId);
        milestone.setTitle(milestoneRequest.getTitle());
        milestone.setDescription(milestoneRequest.getDescription());
        milestone.setDeadline(parseDeadline(milestoneRequest.getDeadline()));

        milestoneRepository.save(milestone);
    }
    public void closeMilestone(Long milestoneId) {
        Milestone milestone = getMilestoneById(milestoneId);
        milestone.setIsClosed(true);
        log.info("마일스톤 상태 변경 close milestone: {}", milestoneId);
        milestoneRepository.save(milestone);
    }

    public void openMilestone(Long milestoneId) {
        Milestone milestone = getMilestoneById(milestoneId);
        milestone.setIsClosed(false);
        log.info("마일스톤 상태 변경 open milestone: {}", milestoneId);
        milestoneRepository.save(milestone);
    }
}
