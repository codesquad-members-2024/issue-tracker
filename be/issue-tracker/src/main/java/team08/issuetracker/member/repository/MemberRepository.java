package team08.issuetracker.member.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import team08.issuetracker.member.model.Member;
import team08.issuetracker.support.db.WithInsert;

@Repository
public interface MemberRepository extends CrudRepository<Member, String>, WithInsert<Member> {

}
