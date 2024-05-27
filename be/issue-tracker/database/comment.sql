-- auto-generated definition
create table COMMENT
(
    ID            BIGINT auto_increment
        primary key,
    WRITER        CHARACTER VARYING(16),
    ISSUE_ID      BIGINT,
    CONTENT       CHARACTER VARYING(255),
    CREATED_AT    TIMESTAMP,
    UPLOADED_FILE CHARACTER VARYING(255),
    FOREIGN KEY (WRITER) REFERENCES MEMBER(member_id),
    FOREIGN KEY (ISSUE_ID) REFERENCES ISSUE(ID)
);

