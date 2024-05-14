package com.codesquad.team3.issuetracker.domain.labels;


import com.codesquad.team3.issuetracker.domain.labels.entity.Label;
import com.codesquad.team3.issuetracker.domain.labels.dto.request.LabelForm;
import com.codesquad.team3.issuetracker.domain.labels.service.LabelService;
import com.codesquad.team3.issuetracker.global.entity.result.Error;
import com.codesquad.team3.issuetracker.global.entity.result.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/labels")
public class LabelController {

    private final LabelService service;

    @PostMapping("")
    public Response create(@RequestBody @Validated LabelForm form,
                           BindingResult bindingResult) {

        if(bindingResult.hasErrors()){

            return getErrorMessage(bindingResult);
        }

        Label label =
                new Label(form.getTitle(), form.getDescription(), form.getColor()
                ,LocalDateTime.now());

        service.create(label);
        return Response.success(label); //Label label
    }

    @GetMapping("/{title}")
    public Label get(@PathVariable("title") String title) {

        log.info("title={}", title);
        return service.getLabel(title);
    }
//
//    @PutMapping("/{title}")
//    publ
////        Label newLabel = new Label(form.getTitle(), form.getDescription(), form.getColor(),
////               LocalDateTime.now());
////        service.update(title, newLabel);
////
////        return newLabel;ic Label update(@PathVariable("title") String title, @RequestBody LabelForm form) {
//
//    }

    @DeleteMapping("/{title}")
    public void delete(@PathVariable("title") String title) {
        service.delete(title);
    }

    private Response getErrorMessage(BindingResult bindingResult) {
        List<Error> errorList= new ArrayList<>();
        List<FieldError> fieldErrors = bindingResult.getFieldErrors();

        for(FieldError fieldError : fieldErrors){
            errorList.add(new Error(fieldError.getDefaultMessage()));
            log.info(fieldError.getDefaultMessage());
        }
        return Response.failure(errorList);
    }

}
