package com.codesquad.team3.issuetracker.domain.labels;


import com.codesquad.team3.issuetracker.domain.labels.entity.Label;
import com.codesquad.team3.issuetracker.domain.labels.dto.request.LabelForm;
import com.codesquad.team3.issuetracker.domain.labels.service.LabelService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/labels")
public class Controller {

    private final LabelService service;

    @PostMapping("")
    public Label create(@RequestBody LabelForm form) {

        Label label =
                new Label(form.getTitle(), form.getDescription(), form.getColor(),
                        LocalDateTime.now());

        service.create(label);
        return label;
    }

    @GetMapping("/{title}")
    public Label get(@PathVariable("title") String title) {

        log.info("title={}", title);
        return service.getLabel(title);
    }

    @PutMapping("/{title}")
    public Label update(@PathVariable("title") String title, @RequestBody LabelForm form) {

        Label newLabel = new Label(form.getTitle(), form.getDescription(), form.getColor(),
               LocalDateTime.now());
        service.update(title, newLabel);

        return newLabel;
    }

    @DeleteMapping("/{title}")
    public void delete(@PathVariable("title") String title) {
        service.delete(title);
    }

}
