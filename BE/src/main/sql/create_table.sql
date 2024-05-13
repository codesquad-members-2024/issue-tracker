CREATE TABLE issue (
                       id int PRIMARY KEY AUTO_INCREMENT,
                       writer_name varchar(20) NOT NULL UNIQUE ,
                       title varchar(60) NOT NULL,
                       create_time timestamp NOT NULL,
                       is_close bool DEFAULT false,
                       writer_id varchar(16) NOT NULL UNIQUE ,
                       milestone_title varchar(20),
                       is_deleted bool DEFAULT false
);

CREATE TABLE comment (
                         id int PRIMARY KEY AUTO_INCREMENT,
                         writer_id varchar(16) NOT NULL UNIQUE ,
                         writer_name varchar(20) NOT NULL UNIQUE ,
                         contents varchar(500) NOT NULL,
                         create_time timestamp NOT NULL,
                         issue_id int NOT NULL UNIQUE ,
                         is_delete bool DEFAULT false
);

CREATE TABLE member (
                        id varchar(16) PRIMARY KEY NOT NULL,
                        password varchar(12) NOT NULL,
                        nickname varchar(20) NOT NULL UNIQUE ,
                        profile_img varchar(50),
                        birthday timestamp NOT NULL,
                        join_time timestamp NOT NULL,
                        email varchar(50) NOT NULL,
                        is_delete bool DEFAULT false
);

CREATE TABLE label (
                       title varchar(10) PRIMARY KEY,
                       description varchar(50) NOT NULL,
                       createTime timestamp NOT NULL,
                       color char(6) DEFAULT '000000',
                       isDeleted bool DEFAULT false
);

CREATE TABLE milestone (
                           title varchar(20) PRIMARY KEY,
                           description varchar(100),
                           deadline timestamp,
                           is_close bool DEFAULT false,
                           is_deleted bool DEFAULT false
);

CREATE TABLE labels_in_issue (
                                 label_title varchar(10) NOT NULL,
                                 issue_id int NOT NULL,
                                 PRIMARY KEY (label_title, issue_id)
);

CREATE TABLE uploaded_file_in_comment (
                                          file varchar(50),
                                          comment_id int,
                                          PRIMARY KEY (file, comment_id)
);

CREATE TABLE assigner(
    issue_id int,
    assigner_id varchar(16),
    PRIMARY KEY (issue_id, assigner_id)

);

ALTER TABLE assigner ADD FOREIGN KEY (issue_id) REFERENCES issue(id);
ALTER TABLE assigner ADD FOREIGN KEY (assigner_id) REFERENCES member(id);

ALTER TABLE uploaded_file_in_comment ADD FOREIGN KEY (comment_id) REFERENCES comment (id);

ALTER TABLE comment ADD FOREIGN KEY (issue_id) REFERENCES issue (id);

ALTER TABLE issue ADD FOREIGN KEY (writer_id) REFERENCES member (id);

ALTER TABLE issue ADD FOREIGN KEY (writer_name) REFERENCES member (nickname);

ALTER TABLE issue ADD FOREIGN KEY (milestone_title) REFERENCES milestone (title);

ALTER TABLE comment ADD FOREIGN KEY (writer_id) REFERENCES member (id);

ALTER TABLE comment ADD FOREIGN KEY (writer_name) REFERENCES member (nickname);

ALTER TABLE labels_in_issue ADD FOREIGN KEY (label_title) REFERENCES label (title);

ALTER TABLE labels_in_issue ADD FOREIGN KEY (issue_id) REFERENCES issue (id);
