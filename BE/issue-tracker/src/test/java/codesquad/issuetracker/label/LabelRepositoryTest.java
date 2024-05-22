package codesquad.issuetracker.label;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.jdbc.DataJdbcTest;

@DataJdbcTest
class LabelRepositoryTest {

    @Autowired
    private LabelRepository labelRepository;

    @Test
    @DisplayName("테스트 라벨 객체를 만들고 저장하는 테스트")
    void testLabelSave() {

        Label label = Label.builder()
            .name("테스트 라벨")
            .description("테스트 내용")
            .backgroundColor("#FF0000")
            .build();

        Label savedLabel = labelRepository.save(label);


        Optional<Label> fetchedLabelOpt = labelRepository.findById(
            savedLabel.getId());

        assertThat(fetchedLabelOpt).isPresent();

        Label fetchedLabel = fetchedLabelOpt.get();
        assertThat(fetchedLabel).usingRecursiveComparison().ignoringFields("id")
            .isEqualTo(savedLabel);

    }

}
