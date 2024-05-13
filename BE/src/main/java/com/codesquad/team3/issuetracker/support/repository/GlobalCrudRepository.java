package com.codesquad.team3.issuetracker.support.repository;

import com.codesquad.team3.issuetracker.support.ApplicationContextProvider;
import org.springframework.context.ApplicationContext;
import org.springframework.data.jdbc.core.JdbcAggregateOperations;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface GlobalCrudRepository<T, ID> extends CrudRepository<T, ID> {

    default JdbcAggregateOperations getJdbcAggregateOperations() {
        ApplicationContext ctx = ApplicationContextProvider.getApplicationContext();
        return ctx.getBean(JdbcAggregateOperations.class);
    }


    @Override
    @Deprecated
    <S extends T> S save(S entity);

    default T insert(T t) {
        return getJdbcAggregateOperations().insert(t);
    }

    default T update(T t) {
        return getJdbcAggregateOperations().update(t);
    }

}
