create table assignee
(
    id       bigint PRIMARY KEY auto_increment,
    issue_id bigint,
    member_id  varchar
)
