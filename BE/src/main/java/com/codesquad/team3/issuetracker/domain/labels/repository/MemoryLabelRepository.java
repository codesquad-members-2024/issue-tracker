package com.codesquad.team3.issuetracker.domain.labels.repository;

import com.codesquad.team3.issuetracker.domain.labels.dto.Label;


import java.util.HashMap;
import java.util.Map;

public class MemoryLabelRepository {


    private final Map<Long, Label> repo = new HashMap<>();
    private Long sequence=0L;


    public Label save(Label label) {
        repo.put(++sequence, label);
        return label;
    }

    public Label update(Long id, Label label) {
        repo.remove(id);
        repo.put(id, label);

        return label;
    }

    public void delete(Long id) {
     repo.remove(id);
    }

    public Label get(Long id) {
        return repo.get(id);
    }


}
