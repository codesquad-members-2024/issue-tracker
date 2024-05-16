package com.codesquad.team3.issuetracker.support.repository;

import com.codesquad.team3.issuetracker.global.entity.SoftDeleteEntity;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface SoftDeleteCrudRepository<T extends SoftDeleteEntity, ID> extends
    SimpleCrudRepository<T, ID> {

    default T softDelete(T entity) {
        entity.delete();
        update(entity);

        return entity;
    }

    default Iterable<T> getAll() {
        return StreamSupport.stream(findAll().spliterator(), false)
            .filter(entity -> !entity.isDeleted())
            .collect(Collectors.toList());
    }

    default Optional<T> getById(ID id) {
        Optional<T> optionalEntity = findById(id);
        if (optionalEntity.isPresent() && optionalEntity.get().isDeleted()) {
            return Optional.empty();
        }
        return optionalEntity;
    }
}