package com.codesquad.team3.issuetracker.domain.labels.repository;

import com.codesquad.team3.issuetracker.domain.labels.dto.Label;

public interface Repository {


    public Label save(Label label);
    public Label update(Long id, Label label);
    public void delete(Long id);
    Label get(Long id);
}
