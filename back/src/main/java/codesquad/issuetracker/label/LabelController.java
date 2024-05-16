package codesquad.issuetracker.label;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LabelController {

    private final LabelService labelService;

    @PostMapping("/labels")
    public void createLabel(@RequestBody Label label) {
        labelService.createLabel(label);
    }
}
