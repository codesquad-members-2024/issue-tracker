package team08.issuetracker.member.repository;

import org.springframework.data.repository.ListCrudRepository;
import org.springframework.stereotype.Repository;
import team08.issuetracker.member.model.Member;
import team08.issuetracker.support.db.WithInsert;

@Repository
public interface MemberRepository extends ListCrudRepository<Member, String>, WithInsert<Member> {

}
