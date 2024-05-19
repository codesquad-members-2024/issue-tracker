package com.CodeSquad.IssueTracker.milestone;

import com.CodeSquad.IssueTracker.milestone.dto.MilestoneRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MilestoneController {
    private final MilestoneService milestoneService;

    public MilestoneController(MilestoneService milestoneService) {
        this.milestoneService = milestoneService;
    }

    @PostMapping("/milestone")
    public ResponseEntity<?> createMilestone(@RequestBody MilestoneRequest milestoneRequest) {
        milestoneService.createMilestone(milestoneRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/milestones/open")
    public ResponseEntity<List<Milestone>> getAllOpenMilestones(){
        List<Milestone> milestones = milestoneService.getOpenMilestones();
        return new ResponseEntity<>(milestones, HttpStatus.OK);
    }

    @GetMapping("/milestones/close")
    public ResponseEntity<List<Milestone>> getAllCloseMilestones(){
        List<Milestone> milestones = milestoneService.getCloseMilestones();
        return new ResponseEntity<>(milestones, HttpStatus.OK);
    }

    @GetMapping("/milestone/{milestoneId}")
    public ResponseEntity<Milestone> getMilestone(@PathVariable Long milestoneId) {
        Milestone milestone = milestoneService.getMilestoneById(milestoneId);
        return new ResponseEntity<>(milestone, HttpStatus.OK);
    }

    @DeleteMapping("/milestone/{milestoneId}")
    public ResponseEntity<?> deleteMilestone(@PathVariable Long milestoneId) {
        milestoneService.deleteMilestone(milestoneId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/milestone/{milestoneId}")
    public ResponseEntity<?> updateMilestone(@PathVariable Long milestoneId, @RequestBody MilestoneRequest milestoneRequest) {
        milestoneService.editMilestone(milestoneId, milestoneRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping ("/milestone/{milestoneId}/open")
    public ResponseEntity<?> openMilestone(@PathVariable Long milestoneId ) {
        milestoneService.openMilestone(milestoneId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping ("/milestone/{milestoneId}/close")
    public ResponseEntity<?> closeMilestone(@PathVariable Long milestoneId ) {
        milestoneService.closeMilestone(milestoneId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
