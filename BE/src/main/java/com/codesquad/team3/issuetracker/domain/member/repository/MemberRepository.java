package com.codesquad.team3.issuetracker.domain.member.repository;

import com.codesquad.team3.issuetracker.domain.member.entity.Member;
import java.util.List;
import java.util.Optional;

import com.codesquad.team3.issuetracker.support.repository.GlobalCrudRepository;
import org.springframework.data.repository.CrudRepository;

public interface MemberRepository extends CrudRepository<Member, Long> {
//
//    Member save(Member member);
//
//    Member getById(String id);
//
//    List<Member> getAll();
//
//    Member modify(Member member);
//
//    Member delete(String id);

}
