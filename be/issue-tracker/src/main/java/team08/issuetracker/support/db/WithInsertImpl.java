package team08.issuetracker.support.db;

import org.springframework.data.jdbc.core.JdbcAggregateOperations;

public class WithInsertImpl<T> implements WithInsert<T> {
    private final JdbcAggregateOperations jdbcAggregateOperations;

    public WithInsertImpl(JdbcAggregateOperations jdbcAggregateOperations) {
        this.jdbcAggregateOperations = jdbcAggregateOperations;
    }

    @Override
    public JdbcAggregateOperations getJdbcAggregateOperations() {
        return this.jdbcAggregateOperations;
    }

}