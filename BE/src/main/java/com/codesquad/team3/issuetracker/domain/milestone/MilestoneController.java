package com.codesquad.team3.issuetracker.domain.milestone;

import com.codesquad.team3.issuetracker.domain.milestone.dto.request.MilestoneForm;
import com.codesquad.team3.issuetracker.domain.milestone.entity.Milestone;
import com.codesquad.team3.issuetracker.domain.milestone.service.MilestoneService;
import com.codesquad.team3.issuetracker.global.entity.result.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/milestones")
@RequiredArgsConstructor
public class MilestoneController {

    private final MilestoneService milestoneService;

    @PostMapping("")
    public Response create(@RequestBody @Validated MilestoneForm form,
                       BindingResult bindingResult) {
        if(bindingResult.hasErrors()){

        }

        Milestone milestone = new Milestone(form.getTitle(), form.getDescription(), form.getDeadLine());
        milestoneService.create(milestone);

        return Response.success(milestone);
    }
}
