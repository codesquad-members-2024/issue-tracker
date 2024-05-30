CREATE TABLE assignee (
                          id BIGINT PRIMARY KEY AUTO_INCREMENT,
                          issue_id BIGINT,
                          member_id VARCHAR(255),
                          FOREIGN KEY (issue_id) REFERENCES issue(id) ON DELETE CASCADE,
                          FOREIGN KEY (member_id) REFERENCES member(member_id) ON DELETE CASCADE
);
