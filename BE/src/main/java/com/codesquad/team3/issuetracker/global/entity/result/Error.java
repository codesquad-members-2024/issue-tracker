package com.codesquad.team3.issuetracker.global.entity.result;

import lombok.Getter;


@Getter
public class Error {

    private final String message;

    public Error(String message) {
        this.message = message;

    }
}
