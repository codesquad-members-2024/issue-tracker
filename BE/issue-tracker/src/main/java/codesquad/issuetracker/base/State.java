package codesquad.issuetracker.base;

public enum State {
    OPEN, CLOSED;

    public static State fromString(String stateStr) {
        return State.valueOf(stateStr.toUpperCase());
    }

}
