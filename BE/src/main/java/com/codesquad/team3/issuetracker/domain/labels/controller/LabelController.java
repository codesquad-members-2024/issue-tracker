package com.codesquad.team3.issuetracker.domain.labels.controller;


import com.codesquad.team3.issuetracker.domain.labels.dto.response.LabelList;
import com.codesquad.team3.issuetracker.domain.labels.entity.Label;
import com.codesquad.team3.issuetracker.domain.labels.dto.request.LabelForm;
import com.codesquad.team3.issuetracker.domain.labels.service.LabelService;
import com.codesquad.team3.issuetracker.global.entity.result.Error;
import com.codesquad.team3.issuetracker.global.entity.result.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/labels")
public class LabelController {

    private final LabelService labelService;

    @PostMapping
    public ResponseEntity<Label> create(@RequestBody @Validated LabelForm form,
                                        BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {

        }

        Label label =
                new Label(form.getTitle(), form.getDescription(), form.getColor());

        labelService.save(label);
        return ResponseEntity.ok(label);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Label> getById(@PathVariable("id") Integer id) {

        Label label = labelService.findById(id);
        return ResponseEntity.ok(label);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Label> updateById(@PathVariable("id") Integer id, @RequestBody @Validated LabelForm form) {
        Label newLabel = new Label(form.getTitle(), form.getDescription(), form.getColor());
        labelService.update(newLabel);

        return ResponseEntity.ok(newLabel);

    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable("id") Integer id) {
        labelService.delete(id);

    }

    @GetMapping
    public ResponseEntity<LabelList> findAll(){
        List<Label> labels = labelService.findAll();

        return ResponseEntity.ok(new LabelList(labels));
    }

    private Response getErrorMessage(BindingResult bindingResult) {
        List<Error> errorList = new ArrayList<>();
        List<FieldError> fieldErrors = bindingResult.getFieldErrors();

        for (FieldError fieldError : fieldErrors) {
            errorList.add(new Error(fieldError.getDefaultMessage()));
            log.info(fieldError.getDefaultMessage());
        }
        return Response.failure(errorList);
    }

}
