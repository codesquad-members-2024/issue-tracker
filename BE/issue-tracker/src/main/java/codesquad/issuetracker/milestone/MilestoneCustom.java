package codesquad.issuetracker.milestone;

import codesquad.issuetracker.base.State;
import codesquad.issuetracker.milestone.dto.MilestoneQueryInfo;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class MilestoneCustom implements MilestoneCustomRepository {

    private static final Logger log = LoggerFactory.getLogger(MilestoneCustom.class);
    private final NamedParameterJdbcTemplate jdbcTemplate;
    private static final String FILTER_SQL_QUERY = "SELECT * FROM MILESTONE WHERE IS_DELETED = FALSE";
    private static final String DELETE_SQL_QUERY = "UPDATE MILESTONE SET IS_DELETED = TRUE WHERE id = :milestoneId";

    @Autowired
    public MilestoneCustom(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Milestone> findFilteredMilestones(MilestoneQueryInfo milestoneQueryInfo) {
        StringBuilder sql = new StringBuilder(FILTER_SQL_QUERY);

        MapSqlParameterSource parameters = new MapSqlParameterSource();

        log.info("state: {}", milestoneQueryInfo.getState());
        log.info("sort: {}", milestoneQueryInfo.getSort());
        log.info("direction: {}", milestoneQueryInfo.getDirection());

        String state = milestoneQueryInfo.getState().name();
        String sort = milestoneQueryInfo.getSort();
        String direction = milestoneQueryInfo.getDirection().name();

        // state
        sql.append(" AND state = :state");
        parameters.addValue("state", state);

        //sort
        sql.append(" ORDER BY ").append(sort);

        // Direction
        sql.append(" ").append(direction);

        log.info("sql : {}", sql);

        return jdbcTemplate.query(sql.toString(), parameters, (rs, rowNum) -> new Milestone(
            rs.getLong("id"),
            rs.getString("title"),
            rs.getString("description"),
            rs.getTimestamp("due_date").toLocalDateTime(),
            State.valueOf(rs.getString("state")),
            rs.getBoolean("is_deleted"),
            rs.getTimestamp("updated_at").toLocalDateTime()
        ));
    }

    @Override
    public void softDeleteByMilestoneId(Long milestoneId) {
        MapSqlParameterSource parameters = new MapSqlParameterSource();
        parameters.addValue("milestoneId", milestoneId);
        jdbcTemplate.update(DELETE_SQL_QUERY, parameters);

    }
}
