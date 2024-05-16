create table issue_attached_label
(
    id       bigint PRIMARY KEY auto_increment,
    issue_id bigint,
    label_id bigint
)