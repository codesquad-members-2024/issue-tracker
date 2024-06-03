CREATE TABLE issue (
                       id BIGINT PRIMARY KEY AUTO_INCREMENT,
                       is_open BOOLEAN NOT NULL,
                       title VARCHAR(255) NOT NULL,
                       content VARCHAR(255),
                       created_at TIMESTAMP NOT NULL,
                       writer VARCHAR(255) NOT NULL,
                       milestone_id BIGINT,
                       uploaded_file VARCHAR(255),
                       FOREIGN KEY (writer) REFERENCES member(member_id),
                       FOREIGN KEY (milestone_id) REFERENCES milestone(id)
);
