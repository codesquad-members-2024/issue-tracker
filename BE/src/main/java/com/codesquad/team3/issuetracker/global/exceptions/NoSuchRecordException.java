package com.codesquad.team3.issuetracker.global.exceptions;

public class NoSuchRecordException extends Exception{

    public NoSuchRecordException() {
        super("해당 레코드가 존재하지 않습니다");
    }
}
