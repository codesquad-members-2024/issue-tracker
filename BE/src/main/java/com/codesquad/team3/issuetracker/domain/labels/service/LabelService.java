package com.codesquad.team3.issuetracker.domain.labels.service;

import com.codesquad.team3.issuetracker.domain.labels.entity.Label;

import java.util.List;

public interface LabelService {

    void save(Label label);

    void update(Label updateLabel);

    void delete(Integer id);

    Label findById(Integer id);

    List<Label> findAll();
}
