package com.CodeSquad.IssueTracker.user;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;


@Repository
public class UserRepository {
    JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(User user) {
        String sql = "insert into IssueTracker.USERS (USER_ID, USER_PASSWORD, USER_NICKNAME) values (?, ?, ?)";
        jdbcTemplate.update(sql,user.getUserId(),user.getUserPassword(),user.getUserNickname());
    }
}
