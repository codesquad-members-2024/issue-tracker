package com.codesquad.team3.issuetracker.support.repository;

import com.codesquad.team3.issuetracker.global.entity.OpenCloseEntity;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface OpenCloseCrudRepository<T extends OpenCloseEntity, ID> extends SimpleCrudRepository<T, ID>{

    default T open(T entity) {
        entity.open();
        update(entity);

        return entity;
    }

    default T close(T entity) {
        entity.close();
        update(entity);

        return entity;
    }
}

