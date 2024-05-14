package codesquad.issuetracker.milestone;

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
    private NamedParameterJdbcTemplate jdbcTemplate;
    private static final String SQL_QUERY = "SELECT * FROM MILESTONE WHERE 1 = 1";

    @Autowired
    public MilestoneCustom(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Milestone> findFilteredMilestones(MilestoneQueryInfo milestoneQueryInfo) {
        StringBuilder sql = new StringBuilder(SQL_QUERY);

        MapSqlParameterSource parameters = new MapSqlParameterSource();

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

        log.info("sql : {}", sql.toString());

        return jdbcTemplate.query(sql.toString(), parameters, (rs, rowNum) -> new Milestone(
            rs.getLong("id"),
            rs.getString("title"),
            rs.getString("description"),
            rs.getDate("due_date").toLocalDate().atTime(0, 0),
            Milestone.State.valueOf(rs.getString("state")),
            rs.getBoolean("is_deleted"),
            rs.getDate("updated_at").toLocalDate().atTime(0, 0)
        ));
    }


}
