package team08.issuetracker.member.repository;

import team08.issuetracker.member.model.Member;

public interface MemberRepository {
    void save(Member member);
}
