package com.codesquad.team3.issuetracker.domain.member.service;

import com.codesquad.team3.issuetracker.domain.member.dto.request.CreateMember;
import com.codesquad.team3.issuetracker.domain.member.dto.request.UpdateMember;
import com.codesquad.team3.issuetracker.domain.member.dto.response.ResponseMember;
import java.util.List;

public interface MemberService {

    ResponseMember save(CreateMember createRequest);

    ResponseMember update(Integer targetId, UpdateMember updateRequest);

    ResponseMember findById(Integer targetId);

    List<ResponseMember> findAll();

    ResponseMember softDeleteById(Integer targetId);

}