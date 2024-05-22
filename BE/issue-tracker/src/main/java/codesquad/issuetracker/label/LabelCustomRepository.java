package codesquad.issuetracker.label;

public interface LabelCustomRepository<T> {

    void update(Long id, T model);
}
