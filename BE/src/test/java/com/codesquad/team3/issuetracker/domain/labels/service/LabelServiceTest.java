package com.codesquad.team3.issuetracker.domain.labels.service;

import com.codesquad.team3.issuetracker.domain.labels.entity.Label;
import com.codesquad.team3.issuetracker.domain.labels.repository.LabelRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.time.LocalDateTime;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class LabelServiceTest {

    @Autowired
    LabelService service;

    @Autowired
    LabelRepository labelRepository;



    @Test
    void test1() {


        LocalDateTime time = LocalDateTime.now();

        Label label = new Label("abc", "aa", "blue", time);
        service.create(label);


        Label findLabel = service.getLabel("abc");

        assertThat(label.getTitle()).isEqualTo("abc");
        assertThat(label.getDescription()).isEqualTo("aa");
        assertThat(label.getColor()).isEqualTo("blue");
        assertThat(findLabel.getCreateTime()).isEqualTo(time);

    }

}