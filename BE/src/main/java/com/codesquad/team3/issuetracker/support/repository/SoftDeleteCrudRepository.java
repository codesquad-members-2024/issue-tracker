package com.codesquad.team3.issuetracker.support.repository;

import com.codesquad.team3.issuetracker.global.entity.SoftDeleteEntity;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface SoftDeleteCrudRepository<T extends SoftDeleteEntity, ID> extends
    SimpleCrudRepository<T, ID> {

    default T softDelete(T entity) {
        entity.delete();
        update(entity);

        return entity;
    }
}