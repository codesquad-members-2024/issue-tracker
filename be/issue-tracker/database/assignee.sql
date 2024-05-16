create table assignee
(
    id       bigint PRIMARY KEY auto_increment,
    issue_id bigint,
    user_id  varchar
)