package com.CodeSquad.IssueTracker.labels;

import com.CodeSquad.IssueTracker.Exception.label.InvalidLabelIdException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class LabelService {

    @Autowired
    private LabelRepository labelRepository;

    public List<Label> getAllLabels() {
        log.info("모든 라벨 조회 요청");
        return (List<Label>) labelRepository.findAll();
    }

    public Optional<Label> getLabelById(Long id) {
        if (id <= 0) {
            throw new InvalidLabelIdException("유효하지 않은 라벨 ID: " + id);
        }
        log.info("라벨 id: {} 조회 요청", id);
        return labelRepository.findById(id);
    }

    public Label createLabel(Label label) {
        log.info("새 라벨 생성 요청: {}", label);
        label.setNew(true);
        return labelRepository.save(label);
    }

    public Label updateLabel(Long id, Label updatedLabel) {
        log.info("라벨 id: {} 업데이트 요청: {}", id, updatedLabel);
        Optional<Label> existingLabel = labelRepository.findById(id);
        if (existingLabel.isPresent()) {
            Label label = existingLabel.get();
            label.setLabelName(updatedLabel.getLabelName());
            label.setDescription(updatedLabel.getDescription());
            label.setTextColor(updatedLabel.getTextColor());
            label.setBgColor(updatedLabel.getBgColor());
            label.setNew(false);
            return labelRepository.save(label);
        }
        log.warn("라벨 id: {} 업데이트 실패, 해당 라벨이 존재하지 않습니다.", id);
        return null;
    }

    public void deleteLabel(Long id) {
        log.info("라벨 id: {} 삭제 요청", id);
        labelRepository.deleteById(id);
    }

}