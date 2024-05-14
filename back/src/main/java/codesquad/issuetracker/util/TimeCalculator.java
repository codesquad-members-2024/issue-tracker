package codesquad.issuetracker.util;

import java.time.Duration;
import java.time.LocalDateTime;

public class TimeCalculator {

    public static String calculateTimeDifference(LocalDateTime creationTime) {

        LocalDateTime presentTime = LocalDateTime.now();
        Duration duration = Duration.between(creationTime, presentTime);

        long seconds = duration.getSeconds();
        long minutes = seconds / 60;
        long hours = minutes / 60;
        long days = hours / 24;
        long weeks = days / 7;
        long years = days / 365;

        if (years > 0) {
            return years + "년";
        } else if (weeks > 0) {
            return weeks + "주";
        } else if (days > 0) {
            return days + "일";
        } else if (hours > 0) {
            return hours + "시간";
        } else if (minutes > 0) {
            return minutes + "분";
        } else {
            return seconds + "초";
        }
    }
}
