package com.CodeSquad.IssueTracker.user;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserRepository {
    JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(User user) {
        String sql = "insert into users (userId, userPassword, userNickname) values (?, ?, ?)";
        jdbcTemplate.update(sql,user.getUserId(),user.getUserPassword(),user.getUserNickname());
    }

    public Optional<User> findUserById(String userId) {
        String sql = "SELECT * FROM users WHERE userId = ?";
        List<User> user = jdbcTemplate.query(sql, userRowMapper(), userId);
        return user.stream().findAny();
    }

    private RowMapper<User> userRowMapper() {
        return (rs, rowNum) -> new User(
                rs.getString("userId"),
                rs.getString("userPassword"),
                rs.getString("userNickname")
        );
    }
}
