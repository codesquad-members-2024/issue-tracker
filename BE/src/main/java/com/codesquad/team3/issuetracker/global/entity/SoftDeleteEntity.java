package com.codesquad.team3.issuetracker.global.entity;

public class SoftDeleteEntity {

    protected boolean isDeleted = false;

    public void delete(){
        this.isDeleted = true;
    }

}
