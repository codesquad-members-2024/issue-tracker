-- mysql
DROP TABLE IF EXISTS COMMENT;
DROP TABLE IF EXISTS ISSUE_LABEL;
DROP TABLE IF EXISTS LABEL;
DROP TABLE IF EXISTS ISSUE;
DROP TABLE IF EXISTS MILESTONE;
DROP TABLE IF EXISTS MEMBER;

CREATE TABLE MEMBER (
                        MEMBER_ID VARCHAR(50) PRIMARY KEY,
                        PASSWORD VARCHAR(256) NOT NULL,
                        CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        MODIFIED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE ISSUE (
    ISSUE_ID BIGINT PRIMARY KEY AUTO_INCREMENT,
    MEMBER_ID VARCHAR(50) NOT NULL,
    MILESTONE_ID BIGINT,
    TITLE VARCHAR(120) NOT NULL,
    CONTENT VARCHAR(2000) NOT NULL,
    IS_OPEN BOOLEAN NOT NULL,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    MODIFIED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE COMMENT (
    COMMENT_ID BIGINT PRIMARY KEY AUTO_INCREMENT,
    MEMBER_ID VARCHAR(50) NOT NULL,
    ISSUE_ID BIGINT NOT NULL,
    COMMENT_SEQ BIGINT,
    CONTENT VARCHAR(2000) NOT NULL,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    MODIFIED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE LABEL (
    LABEL_ID VARCHAR(20) PRIMARY KEY,
    DESCRIPTION VARCHAR(50),
    TEXT_COLOR VARCHAR(7) NOT NULL,
    COLOR_CODE VARCHAR(7) NOT NULL,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    MODIFIED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE ISSUE_LABEL (
    ISSUE_ID BIGINT NOT NULL,
    LABEL_ID VARCHAR(20) NOT NULL,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    MODIFIED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (ISSUE_ID, LABEL_ID)
);

CREATE TABLE MILESTONE (
    MILESTONE_ID BIGINT PRIMARY KEY AUTO_INCREMENT,
    NAME VARCHAR(30) NOT NULL,
    IS_OPEN BOOLEAN NOT NULL,
    DUE_DATE DATE,
    DESCRIPTION VARCHAR(50),
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    MODIFIED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE COMMENT ADD FOREIGN KEY (MEMBER_ID) REFERENCES MEMBER (MEMBER_ID);
ALTER TABLE COMMENT ADD FOREIGN KEY (ISSUE_ID) REFERENCES ISSUE (ISSUE_ID);
ALTER TABLE ISSUE ADD FOREIGN KEY (MEMBER_ID) REFERENCES MEMBER (MEMBER_ID);
ALTER TABLE ISSUE ADD FOREIGN KEY (MILESTONE_ID) REFERENCES MILESTONE (MILESTONE_ID);
ALTER TABLE ISSUE_LABEL ADD FOREIGN KEY (ISSUE_ID) REFERENCES ISSUE (ISSUE_ID);
ALTER TABLE ISSUE_LABEL ADD FOREIGN KEY (LABEL_ID) REFERENCES LABEL (LABEL_ID);
