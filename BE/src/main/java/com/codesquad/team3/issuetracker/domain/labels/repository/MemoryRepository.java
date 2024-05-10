package com.codesquad.team3.issuetracker.domain.labels.repository;

import com.codesquad.team3.issuetracker.domain.labels.dto.Label;


import java.util.HashMap;
import java.util.Map;

@org.springframework.stereotype.Repository
public class MemoryRepository implements Repository {


    private final Map<Long, Label> repo = new HashMap<>();
    private Long sequence=0L;


    @Override
    public Label save(Label label) {
        repo.put(++sequence, label);
        return label;
    }

    @Override
    public Label update(Long id, Label label) {
        repo.remove(id);
        repo.put(id, label);

        return label;
    }

    @Override
    public void delete(Long id) {
     repo.remove(id);
    }

    @Override
    public Label get(Long id) {
        return repo.get(id);
    }


}
