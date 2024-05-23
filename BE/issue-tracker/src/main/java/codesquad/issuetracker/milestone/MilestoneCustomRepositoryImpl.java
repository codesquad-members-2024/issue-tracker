package codesquad.issuetracker.milestone;

import codesquad.issuetracker.base.State;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class MilestoneCustomRepositoryImpl implements MilestoneCustomRepository {

    private final NamedParameterJdbcTemplate jdbcTemplate;
    private final MapSqlParameterSource parameters = new MapSqlParameterSource();

    @Autowired
    public MilestoneCustomRepositoryImpl(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<Milestone> milestoneRowMapper = ((rs, rowNum) -> Milestone.builder()
        .id(rs.getLong("id"))
        .title(rs.getString("title"))
        .description(rs.getString("description"))
        .dueDate(rs.getTimestamp("due_date").toLocalDateTime())
        .state(State.valueOf(rs.getString("state")))
        .isDeleted(rs.getBoolean("is_deleted"))
        .updatedAt(rs.getTimestamp("updated_at").toLocalDateTime())
        .build());

    @Override
    public Page<Milestone> findAll(Pageable pageable) {
        String query = "SELECT * FROM MILESTONE WHERE IS_DELETED = FALSE LIMIT :limit OFFSET :offset";
        parameters.addValue("limit", pageable.getPageSize());
        parameters.addValue("offset", pageable.getOffset());
        List<Milestone> milestones = jdbcTemplate.query(query, parameters, milestoneRowMapper);

        String countQuery = "SELECT COUNT(*) FROM LABEL WHERE IS_DELETED = FALSE";
        Long total = jdbcTemplate.queryForObject(countQuery, parameters, Long.class);
        return new PageImpl<>(milestones, pageable, total);
    }
}
