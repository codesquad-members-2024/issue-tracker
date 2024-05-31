CREATE TABLE milestone
(
    id            bigint PRIMARY KEY AUTO_INCREMENT,
    is_open       boolean      NOT NULL,
    name          varchar(255) NOT NULL,
    description   varchar(255),
    complete_date DATE
);