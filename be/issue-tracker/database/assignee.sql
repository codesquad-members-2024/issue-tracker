CREATE TABLE assignee
(
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    issue_id BIGINT,
    member_id VARCHAR(255),
    FOREIGN KEY (issue_id) REFERENCES issue(id),
    FOREIGN KEY (member_id) REFERENCES member(member_id)
);
