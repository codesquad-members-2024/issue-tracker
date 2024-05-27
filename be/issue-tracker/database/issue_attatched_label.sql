CREATE TABLE issue_attached_label (
                                      id BIGINT PRIMARY KEY AUTO_INCREMENT,
                                      issue_id BIGINT,
                                      label_id BIGINT,
                                      FOREIGN KEY (issue_id) REFERENCES issue(id),
                                      FOREIGN KEY (label_id) REFERENCES label(id)
);
