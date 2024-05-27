CREATE TABLE comment (
                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         writer VARCHAR(16),
                         issue_id BIGINT,
                         content VARCHAR(255),
                         created_at TIMESTAMP,
                         uploaded_file VARCHAR(255),
                         FOREIGN KEY (writer) REFERENCES member(member_id),
                         FOREIGN KEY (issue_id) REFERENCES issue(id)
);
