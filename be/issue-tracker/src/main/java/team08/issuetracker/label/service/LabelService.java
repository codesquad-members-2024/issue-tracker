package team08.issuetracker.label.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import team08.issuetracker.label.model.Label;
import team08.issuetracker.label.model.dto.LabelCreationDto;
import team08.issuetracker.label.repository.LabelRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class LabelService {
    private final LabelRepository labelRepository;

    public void createLabel(LabelCreationDto labelCreationDto) {
        // 1) DTO -> Entity 변환
        Label label = convertToEntity(labelCreationDto);
        // 2) 저장
        labelRepository.save(label);

        log.info("라벨 생성 성공 : {}", labelCreationDto.getName());
    }

    private Label convertToEntity(LabelCreationDto labelCreationDto) {
        return new Label(
                labelCreationDto.getName(),
                labelCreationDto.getDescription(),
                labelCreationDto.getBackground_color(),
                labelCreationDto.getText_color()
        );
    }
}
