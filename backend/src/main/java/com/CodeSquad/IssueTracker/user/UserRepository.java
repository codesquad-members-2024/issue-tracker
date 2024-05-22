package com.CodeSquad.IssueTracker.user;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, String> {

    @Query("SELECT user_id FROM users")
    public List<String> getAllUserIds();
}
