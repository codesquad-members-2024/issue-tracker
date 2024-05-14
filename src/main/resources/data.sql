-- mysql

-- test user insert
INSERT INTO MEMBER(MEMBER_ID, PASSWORD) VALUES ("tester", "1234");

INSERT INTO MILESTONE(NAME) VALUES("testMilestone");

INSERT INTO ISSUE(MEMBER_ID, TITLE, CONTENT) VALUES ("tester", "testTitle", "testContent");