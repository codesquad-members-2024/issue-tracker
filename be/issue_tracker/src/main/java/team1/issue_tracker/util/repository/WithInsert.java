package team1.issue_tracker.util.repository;

import org.springframework.data.jdbc.core.JdbcAggregateOperations;

public interface WithInsert<T> {
	JdbcAggregateOperations getJdbcAggregateOperations();

	default T insert(T t) {
		return this.getJdbcAggregateOperations().insert(t);
	}
}
