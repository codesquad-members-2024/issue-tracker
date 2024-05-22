package codesquad.issuetracker.label;

import codesquad.issuetracker.utils.FieldnameConverter;
import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;
import java.util.StringJoiner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class LabelCustomRepositoryImpl<T> implements LabelCustomRepository {

    private static final Logger log = LoggerFactory.getLogger(LabelCustomRepositoryImpl.class);
    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public LabelCustomRepositoryImpl(NamedParameterJdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void update(Long id, Object model) {
        try {
            Map<String, Object> fieldsToUpdate = new HashMap<>();
            Field[] fields = model.getClass().getDeclaredFields();

            for (Field field : fields) {
                field.setAccessible(true);
                Object value = field.get(model);
                if (field.getType().isEnum()) {
                    value = value.toString();
                }
                if (value != null) {
                    fieldsToUpdate.put(FieldnameConverter.convertToSnakeCase(field.getName()), value);
                }
            }

            if (fieldsToUpdate.isEmpty()) {
                return;
            }

            StringJoiner setClause = new StringJoiner(", ");
            fieldsToUpdate.forEach((field, value) -> setClause.add(field + " = :" + field));

            String tableName = model.getClass().getSimpleName().toUpperCase();
            String sql = "UPDATE " + tableName + " SET " + setClause + " WHERE id = :id";
            fieldsToUpdate.put("id", id);

            MapSqlParameterSource parameters = new MapSqlParameterSource(fieldsToUpdate);

            log.info("sql: {}", sql);
            jdbcTemplate.update(sql, parameters);
        } catch (IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }

}
