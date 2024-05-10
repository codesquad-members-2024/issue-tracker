package team08.issuetracker.member.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import team08.issuetracker.member.model.Member;

@RequiredArgsConstructor
@Repository
public class DbMemberRepository implements MemberRepository {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void save(Member member) {
        String sql = "INSERT INTO MEMBER (member_id, password) VALUES (?, ?)";

        jdbcTemplate.update(sql, member.getMemberId(), member.getPassword());
    }
}