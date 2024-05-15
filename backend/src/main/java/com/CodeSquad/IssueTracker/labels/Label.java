package com.CodeSquad.IssueTracker.labels;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.Persistable;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Setter
@Table("labels")
public class Label implements Persistable<Long> {

    @Id
    private Long labelId;

    private String labelName;

    private String description;

    private String textColor;

    private String bgColor;

    @Transient
    private boolean isNew = true;

    public Label() {}

    @Override
    public Long getId() {
        return labelId;
    }

    @Override
    public boolean isNew() {
        return isNew;
    }

    public Label(Long labelId, String labelName, String description, String textColor, String bgColor) {
        this.labelId = labelId;
        this.labelName = labelName;
        this.description = description;
        this.textColor = textColor;
        this.bgColor = bgColor;
    }
}