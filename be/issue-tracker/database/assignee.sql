create table assignee
(
    id       bigint PRIMARY KEY auto_increment,
    issue_id bigint,
    member_id  varchar,
    FOREIGN KEY (issue_id) REFERENCES issue(id),
    FOREIGN KEY (member_id) REFERENCES member(member_id)
)

