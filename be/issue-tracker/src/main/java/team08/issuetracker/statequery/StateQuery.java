package team08.issuetracker.statequery;

import team08.issuetracker.exception.quertstate.QueryStateException;

public enum StateQuery {
    OPENED("opened", true), CLOSED("closed", false);

    private final String queryString;
    private final Boolean state;

    StateQuery(String queryString, Boolean state) {
        this.queryString = queryString;
        this.state = state;
    }

    public static boolean convertQueryToState(String state) {
        if (state == null || state.equals(OPENED.queryString)) {
            return OPENED.state;
        }
        if (state.equals(CLOSED.queryString)) {
            return CLOSED.state;
        }
        throw new QueryStateException();
    }
}
