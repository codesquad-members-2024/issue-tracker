package com.codesquad.team3.issuetracker.support.repository;

import com.codesquad.team3.issuetracker.global.entity.OpenCloseEntity;
import com.codesquad.team3.issuetracker.support.enums.OpenCloseSearchFlags;
import com.codesquad.team3.issuetracker.support.iterator.OpenCloseTableIterator;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.Iterator;

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

    default Iterator<T> findAll(OpenCloseSearchFlags flags) {
        if (flags.equals(OpenCloseSearchFlags.ALL)) return findAll().iterator();

        return new OpenCloseTableIterator<>(findAll().iterator(), flags);
    }
}

