CREATE TABLE issue (
                       id bigint PRIMARY KEY auto_increment,
                       is_open boolean NOT NULL,
                       title varchar NOT NULL,
                       content varchar,
                       created_at timestamp NOT NULL,
                       writer varchar NOT NULL,
                       milestone_id bigint,
                       uploaded_file varchar
);