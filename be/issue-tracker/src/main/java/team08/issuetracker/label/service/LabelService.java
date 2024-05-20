package team08.issuetracker.label.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import team08.issuetracker.exception.label.LabelNotFoundException;
import team08.issuetracker.label.model.Label;
import team08.issuetracker.label.model.dto.*;
import team08.issuetracker.label.repository.LabelRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class LabelService {
    private final LabelRepository labelRepository;

    public LabelResponse getLabelsWithCount() {
        LabelCountDto labelCount = getLabelCountDto();

        List<LabelDto> labels = labelRepository.getAllLabels().stream()
                .map(LabelDto::new)
                .collect(Collectors.toList());

        return new LabelResponse(labelCount, labels);
    }


    public Label createLabel(LabelCreationDto labelCreationDto) {
        // 1) DTO -> Entity 변환
        Label label = convertToEntity(labelCreationDto);

        // 2) 저장 및 반환
        return labelRepository.save(label);
    }


    public Label updateLabel(Long id, LabelUpdateDto labelUpdateDto) {
        // 1) 주어진 id에 해당하는 라벨 찾기. 없으면 예외 발생
        Label label = labelRepository.findById(id).orElseThrow(LabelNotFoundException::new);

        // 2) 찾은 라벨을 업데이트 데이터로 갱신
        label.update(labelUpdateDto);

        // 3) 업데이트 내용 저장 및 반환
        return labelRepository.save(label);
    }


    public void deleteLabel(Long id) {
        Label label = labelRepository.findById(id).orElseThrow(LabelNotFoundException::new);

        labelRepository.delete(label);
    }


    private Label convertToEntity(LabelCreationDto labelCreationDto) {
        return new Label(
                labelCreationDto.name(),
                labelCreationDto.description(),
                labelCreationDto.backgroundColor(),
                labelCreationDto.textColor()
        );
    }


    private LabelCountDto getLabelCountDto() {
        return new LabelCountDto(labelRepository.countLabels());
    }
}
