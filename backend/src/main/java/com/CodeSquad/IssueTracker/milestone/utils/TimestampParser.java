package com.CodeSquad.IssueTracker.milestone.utils;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;

public class TimestampParser {
    private static final DateTimeFormatter ISO_OFFSET_DATE_TIME_FORMATTER = DateTimeFormatter.ISO_OFFSET_DATE_TIME;

    public static Timestamp parseDeadline(String deadlineString) {
        OffsetDateTime offsetDateTime = OffsetDateTime.parse(deadlineString, ISO_OFFSET_DATE_TIME_FORMATTER);
        Instant instant = offsetDateTime.toInstant();
        return Timestamp.from(instant);
    }
}
