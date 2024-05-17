package com.codesquad.team3.issuetracker.support.repository;

import com.codesquad.team3.issuetracker.global.entity.OpenCloseEntity;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
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

    default List<T> getAllOpened() {
        return StreamSupport.stream(findAll().spliterator(), false)
            .filter(entity -> !entity.isClosed())
            .collect(Collectors.toList());
    }

    default List<T> getAllClosed() {
        return StreamSupport.stream(findAll().spliterator(), false)
            .filter(OpenCloseEntity::isClosed)
            .collect(Collectors.toList());
    }
}

