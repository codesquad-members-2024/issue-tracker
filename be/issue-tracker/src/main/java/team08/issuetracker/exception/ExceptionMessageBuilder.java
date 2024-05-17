package team08.issuetracker.exception;

public class ExceptionMessageBuilder {
    public static String buildMessage(Exception exception) {
        return String.format("%s : %s", exception.getClass().getSimpleName(), exception.getMessage());
    }
}
