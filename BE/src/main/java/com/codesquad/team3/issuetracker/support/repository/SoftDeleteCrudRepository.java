package com.codesquad.team3.issuetracker.support.repository;

import com.codesquad.team3.issuetracker.global.entity.SoftDeleteEntity;
import com.codesquad.team3.issuetracker.support.enums.SoftDeleteSearchFlags;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.Optional;

import static com.codesquad.team3.issuetracker.support.repository.RepositorySupport.getJdbcAggregateTemplate;
import static com.codesquad.team3.issuetracker.support.repository.RepositorySupport.getQuery;


@NoRepositoryBean
public interface SoftDeleteCrudRepository<T extends SoftDeleteEntity, ID> extends
    SimpleCrudRepository<T, ID> {

    default T softDelete(T entity) {
        entity.delete();
        update(entity);

        return entity;
    }

    default T recover(T entity) {
        entity.recover();
        update(entity);

        return entity;
    }

    @Override
    @Deprecated
    Iterable<T> findAll();

    default Iterable<? extends SoftDeleteEntity> findAll(Class<T> entityClass, SoftDeleteSearchFlags flags) {
        return getJdbcAggregateTemplate().findAll(getQuery(flags), entityClass);
    }

    default int countByDeleteCondition(Class<T> entityClass, SoftDeleteSearchFlags flags) {
        return (int) getJdbcAggregateTemplate().count(getQuery(flags), entityClass);
    }

    default Optional<T> findByIdWithDeleteCondition(ID id, Class<T> entityClass, SoftDeleteSearchFlags flags) {
        return getJdbcAggregateTemplate().findOne(getQuery(id, flags), entityClass);
    }
}


