package team08.issuetracker.label.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import team08.issuetracker.label.model.Label;
import team08.issuetracker.label.model.dto.LabelCountDto;
import team08.issuetracker.label.model.dto.LabelCreationDto;
import team08.issuetracker.label.repository.LabelRepository;

@Service
@Slf4j
@RequiredArgsConstructor
public class LabelService {
    private final LabelRepository labelRepository;

    public Label createLabel(LabelCreationDto labelCreationDto) {
        // 1) DTO -> Entity 변환
        Label label = convertToEntity(labelCreationDto);

        // 2) 저장 및 반환
        return labelRepository.save(label);
    }

    private Label convertToEntity(LabelCreationDto labelCreationDto) {
        return new Label(
                labelCreationDto.name(),
                labelCreationDto.description(),
                labelCreationDto.backgroundColor(),
                labelCreationDto.textColor()
        );
    }

    public LabelCountDto getLabelCount() {
        long totalCount = labelRepository.count();

        return new LabelCountDto(totalCount);
    }
}
