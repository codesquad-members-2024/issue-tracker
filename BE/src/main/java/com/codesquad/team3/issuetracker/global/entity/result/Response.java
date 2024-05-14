package com.codesquad.team3.issuetracker.global.entity.result;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.util.List;
@Getter
@RequiredArgsConstructor
public class Response {

    private final boolean success;
    private final List<Error> errors;
    private final Object data;

    public static Response success() {
        return new Response(true, null, null);
    }

    public static Response success(Object data) {
        return new Response(true, null, data);
    }

    public static Response failure(List<Error> errors) {
        return new Response(false, errors, null);
    }
}
