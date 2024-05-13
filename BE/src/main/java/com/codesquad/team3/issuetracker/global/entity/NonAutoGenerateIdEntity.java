package com.codesquad.team3.issuetracker.global.entity;

import org.springframework.data.domain.Persistable;

public abstract class NonAutoGenerateIdEntity<T> implements Persistable<T> {

    protected boolean isNew = false;
    @Override
    public boolean isNew() {
        return isNew;
    }

    public void setInsert() {
        this.isNew = true;
    }

    public void setUpdate() {
        this.isNew = false;
    }
}
