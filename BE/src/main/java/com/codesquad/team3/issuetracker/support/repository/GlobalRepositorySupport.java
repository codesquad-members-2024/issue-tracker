package com.codesquad.team3.issuetracker.support.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jdbc.core.JdbcAggregateOperations;

@Configuration
@RequiredArgsConstructor
public class GlobalRepositorySupport {

    private final JdbcAggregateOperations jdbcAggregateOperations;

    @Bean
    public JdbcAggregateOperations getJdbcAggregateOperations() {
        return jdbcAggregateOperations;
    }
}
