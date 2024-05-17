DROP DATABASE IF EXISTS Issue;

CREATE DATABASE IF NOT EXISTS Issue;
USE Issue;

CREATE TABLE IF NOT EXISTS USERS
(
    ID         VARCHAR(255) PRIMARY KEY,
    USERNAME   VARCHAR(255),
    PASSWORD   VARCHAR(255),
    ROLE       VARCHAR(255),
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    IS_DELETED BOOLEAN
);

CREATE TABLE IF NOT EXISTS ISSUE
(
    ID           BIGINT PRIMARY KEY AUTO_INCREMENT,
    AUTHOR_ID    VARCHAR(255),
    TITLE        VARCHAR(255),
    DESCRIPTION  VARCHAR(255),
    OPEN_AT      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CLOSED_AT    TIMESTAMP,
    MILESTONE_ID BIGINT,
    IS_OPEN      BOOLEAN,
    IS_DELETED   BOOLEAN,
    FOREIGN KEY (AUTHOR_ID) REFERENCES USERS (ID) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS LABEL
(
    ID          BIGINT PRIMARY KEY AUTO_INCREMENT,
    NAME        VARCHAR(255),
    DESCRIPTION VARCHAR(255),
    COLOR       VARCHAR(8),
    IS_DELETED  BOOLEAN,
    CREATED_AT  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ISSUE_LABEL
(
    ISSUE_ID BIGINT NOT NULL,
    LABEL_ID BIGINT NOT NULL,
    PRIMARY KEY (ISSUE_ID, LABEL_ID),
    FOREIGN KEY (ISSUE_ID) REFERENCES ISSUE (ID) ON UPDATE CASCADE,
    FOREIGN KEY (LABEL_ID) REFERENCES LABEL (ID) ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS MILESTONE
(
    ID          BIGINT PRIMARY KEY AUTO_INCREMENT,
    TITLE       VARCHAR(255),
    DESCRIPTION VARCHAR(255),
    DUE_DATE    DATETIME,
    STATE       VARCHAR(10),
    IS_DELETED  BOOLEAN,
    UPDATED_AT  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
