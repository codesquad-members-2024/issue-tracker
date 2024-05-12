CREATE TABLE IF NOT EXISTS users
(
                       id varchar(255) PRIMARY KEY,
                       username varchar(255),
                       password varchar(255),
                       created_at timestamp,
                       is_deleted bool
);

CREATE TABLE IF NOT EXISTS milestone
(
                           id bigint PRIMARY KEY,
                           title varchar(255),
                           description varchar(255),
                           due_date timestamp,
                           is_open bool,
                           is_deleted bool,
                           created_at timestamp,
                           updated_at timestamp
);

CREATE TABLE IF NOT EXISTS issue
(
                       id bigint PRIMARY KEY,
                       author_id varchar(255),
                       title varchar(255),
                       description varchar(255),
                       open_at timestamp,
                       updated_at timestamp,
                       closed_at timestamp,
                       milestone_id bigint,
                       is_open bool,
                       is_deleted bool,
                       FOREIGN KEY (milestone_id) REFERENCES milestone (id)
);

CREATE TABLE IF NOT EXISTS comment
(
                         id bigint PRIMARY KEY,
                         author_id varchar(255),
                         contents varchar(255),
                         created_at timestamp,
                         updated_at timestamp,
                         FOREIGN KEY (author_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS label
(
                       id bigint,
                       name varchar(255),
                       description varchar(255),
                       color varchar(255),
                       is_deleted bool,
                       created_at timestamp,
                       updated_at timestamp
);

CREATE TABLE IF NOT EXISTS issue_label
(
                             issue_id bigint,
                             label_id bigint,
                             PRIMARY KEY (issue_id, label_id),
--                              FOREIGN KEY (issue_id) REFERENCES issue (id),
--                              FOREIGN KEY (label_id) REFERENCES label (id)
);

