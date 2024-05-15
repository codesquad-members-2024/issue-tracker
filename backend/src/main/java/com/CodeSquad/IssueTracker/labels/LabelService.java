package com.CodeSquad.IssueTracker.labels;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LabelService {

    @Autowired
    private LabelRepository labelRepository;

    public List<Label> getAllLabels() {
        return (List<Label>) labelRepository.findAll();
    }

    public Optional<Label> getLabelById(Long id) {
        return labelRepository.findById(id);
    }

    public Label createLabel(Label label) {
        label.setNew(true);
        return labelRepository.save(label);
    }
    public Label updateLabel(Long id, Label updatedLabel) {
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
        return null;
    }

    public void deleteLabel(Long id) {
        labelRepository.deleteById(id);
    }

}