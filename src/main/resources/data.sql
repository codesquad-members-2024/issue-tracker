-- mysql

-- test user insert
INSERT INTO MEMBER(MEMBER_ID, PASSWORD) VALUES ("tester", "1234");

INSERT INTO ISSUE (MEMBER_ID, TITLE, CONTENT, IS_OPEN) VALUES ("tester", "test", "test zz", true);

INSERT INTO MILESTONE(NAME) VALUES("testMilestone");