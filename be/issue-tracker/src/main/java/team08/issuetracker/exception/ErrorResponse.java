package team08.issuetracker.exception;


import lombok.Getter;

@Getter
public class ErrorResponse {
    private final String errorMessage;

    public ErrorResponse(RuntimeException e) {
        this.errorMessage = e.getMessage();
    }

    public static ErrorResponse from(RuntimeException e) {
        return new ErrorResponse(e);
    }

    @Override
    public String toString() {
        return errorMessage;
    }

}
