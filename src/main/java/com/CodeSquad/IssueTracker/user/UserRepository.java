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
        String sql = "insert into IssueTracker.users (userId, userPassword, userNickname) values (?, ?, ?)";
        jdbcTemplate.update(sql,user.getUserId(),user.getUserPassword(),user.getUserNickname());
    }

    public boolean existsByUserID(String userID){
        String sql = "select count(*) from IssueTracker.users where userID = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, userID);

        return count != null && count > 0;
    }
}
