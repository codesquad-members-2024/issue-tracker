package codesquad.issuetracker.global.repository;

public interface CustomCrudRepository<T, ID> {

    void update(ID id, T entity);

}
