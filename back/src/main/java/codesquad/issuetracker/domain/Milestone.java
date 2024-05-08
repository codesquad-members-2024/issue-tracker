package codesquad.issuetracker.domain;

public class Milestone {

    private String name;
    private String dueDate;
    private boolean valid;

    public Milestone(String name,
                     String dueDate,
                     boolean valid) {
        this.name = name;
        this.dueDate = dueDate;
        this.valid = valid;
    }
}
