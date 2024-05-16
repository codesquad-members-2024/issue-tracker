package com.codesquad.team3.issuetracker.support.repository;

import com.codesquad.team3.issuetracker.global.entity.SoftDeleteEntity;
import com.codesquad.team3.issuetracker.support.enums.SoftDeleteSearchFlags;
import com.codesquad.team3.issuetracker.support.iterator.SoftDeleteTableIterator;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.Iterator;

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

    default Iterator<T> findAll(SoftDeleteSearchFlags skipFlags) {
        if (skipFlags.equals(SoftDeleteSearchFlags.ALL)) return findAll().iterator();

        return new SoftDeleteTableIterator<>(findAll().iterator(), skipFlags);
    }
}


