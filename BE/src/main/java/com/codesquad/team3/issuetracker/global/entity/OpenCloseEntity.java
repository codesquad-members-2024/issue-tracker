package com.codesquad.team3.issuetracker.global.entity;

public class OpenCloseEntity {

    protected boolean isClosed = false;

    public void close() {
        this.isClosed = true;
    }

    public void open() {
        this.isClosed = false;
    }

    public boolean isClosed() {
        return isClosed;
    }
}

