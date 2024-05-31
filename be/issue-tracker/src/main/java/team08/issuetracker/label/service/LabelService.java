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

    public long getTotalMilestoneCounts() {
        return labelRepository.count();
    }

    public LabelListWithCountResponse getLabelsWithCount() {
        LabelCountResponse labelCount = fetchLabelCount();

        List<LabelResponse> labels = labelRepository.getAllLabels().stream()
                .map(LabelResponse::new)
                .collect(Collectors.toList());

        return new LabelListWithCountResponse(labelCount, labels);
    }


    public Label createLabel(LabelCreationRequest labelCreationRequest) {
        // 1) DTO -> Entity 변환
        Label label = labelCreationRequest.toEntity();

        // 2) 저장 및 반환
        return labelRepository.save(label);
    }


    public Label getLabel(Long id) {
        return labelRepository.findById(id)
                .orElseThrow(LabelNotFoundException::new);
    }


    public Label updateLabel(Long id, LabelUpdateRequest labelUpdateRequest) {
        // 1) 주어진 id에 해당하는 라벨 찾기. 없으면 예외 발생
        Label label = labelRepository.findById(id)
                .orElseThrow(LabelNotFoundException::new);

        // 2) 찾은 라벨을 업데이트 데이터로 갱신
        label.update(labelUpdateRequest);

        // 3) 업데이트 내용 저장 및 반환
        return labelRepository.save(label);
    }


    public void deleteLabel(Long id) {
        Label label = labelRepository.findById(id)
                .orElseThrow(LabelNotFoundException::new);

        labelRepository.delete(label);
    }


    private LabelCountResponse fetchLabelCount() {
        return new LabelCountResponse(labelRepository.countLabels());
    }

//    // 이슈 상세에서 사용
//    public List<LabelSummaryDto> getLabelSummaryDto(long issueId) {
//        List<Label> labels = getLabelsByIssueId(issueId);
//        log.error(labels.toString());
//
//        return labels.stream()
//                .map(LabelSummaryDto::new)
//                .collect(Collectors.toList());
//    }
//
//    private List<Label> getLabelsByIssueId(long issueId) {
//        return labelRepository.findByIssueId(issueId);
//    }
}
