package com.codesquad.team3.issuetracker.domain.labels;


import com.codesquad.team3.issuetracker.domain.labels.dto.Label;
import com.codesquad.team3.issuetracker.domain.labels.dto.LabelForm;
import com.codesquad.team3.issuetracker.domain.labels.service.LabelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/labels")
public class Controller {

    private final LabelService service;

    @PostMapping("")
    public Label create(@RequestBody LabelForm form) {

        Label label = new Label(form.getName(), form.getDescription(), form.getColor());
        service.create(label);
        return label;
    }

//    @GetMapping("/{id}")
//    public Label get(@PathVariable("id")Long id) {
////        return service.getLabel(id);
//    }

    @PutMapping("/{id}")
    public Label update(@PathVariable("id")Long id, @RequestBody LabelForm form){

        Label newLabel = new Label(form.getName(), form.getDescription(), form.getColor());
        service.update(id, newLabel);

        return newLabel;
    }
//
//    @DeleteMapping("/{id}")
//    public void delete(@PathVariable("id")Long id){
//        service.delete(id);
//    }

}
