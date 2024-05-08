package codesquad.issuetracker.domain;

import java.time.LocalDateTime;

public class Issue {

    private int id;
    private String title;
    private String content;
    private String profileImage;
    private String milestoneId;
    private String labelId;
    private String manager;
    private String writer;
    private LocalDateTime createTime;
    private boolean deleted;

    public Issue(int id,
                 String title,
                 String content,
                 String profileImage,
                 String milestoneId,
                 String labelId,
                 String manager,
                 String writer) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.profileImage = profileImage;
        this.milestoneId = milestoneId;
        this.labelId = labelId;
        this.manager = manager;
        this.writer = writer;
        this.createTime = LocalDateTime.now();
        this.deleted = false;
    }

    public int getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public String getMilestoneId() {
        return milestoneId;
    }

    public String getLabelId() {
        return labelId;
    }

    public String getManager() {
        return manager;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public String getWriter() {
        return writer;
    }

    public boolean isDeleted() {
        return deleted;
    }
}
