package codesquad.issuetracker.label;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.jdbc.DataJdbcTest;

@DataJdbcTest
class LabelRepositoryTest {

    @Autowired
    private LabelRepository labelRepository;

    private Label label;

    @BeforeEach
    void setUp() {
        label = Label.builder()
            .name("테스트 라벨")
            .description("테스트 내용")
            .backgroundColor("#FF0000")
            .build();
    }

    @Test
    @DisplayName("라벨을 저장 기능 테스트")
    void testLabelSave() {

        Label savedLabel = labelRepository.save(label);

        Optional<Label> fetchedLabelOpt = labelRepository.findById(
            savedLabel.getId());

        assertThat(fetchedLabelOpt).isPresent();

        Label fetchedLabel = fetchedLabelOpt.get();
        assertThat(fetchedLabel).usingRecursiveComparison().ignoringFields("id")
            .isEqualTo(savedLabel);

    }

    @Test
    @DisplayName("삭제된 라벨을 찾는 테스트")
    void testFindDeletedLabel_ReturnsOptionalEmpty() {
        Label deletedLabel = Label.builder()
            .isDeleted(true)
            .build();

        Label savedLabel = labelRepository.save(deletedLabel);
        Optional<Label> foundLabel = labelRepository.findById(savedLabel.getId());
        assertThat(foundLabel).isEmpty();

    }

    @Test
    @DisplayName("삭제되지 않은 라벨만 세는 테스트")
    void testCountLabels_ReturnsSizeOne() {
        Label deletedLabel = Label.builder()
            .isDeleted(true)
            .build();

        labelRepository.save(deletedLabel);
        labelRepository.save(label);

        assertThat(labelRepository.countLabels()).isEqualTo(1);
    }
}
