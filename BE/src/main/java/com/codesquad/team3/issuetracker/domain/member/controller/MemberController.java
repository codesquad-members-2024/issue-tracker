package com.codesquad.team3.issuetracker.domain.member.controller;

import com.codesquad.team3.issuetracker.domain.member.dto.request.CreateMember;
import com.codesquad.team3.issuetracker.domain.member.dto.request.UpdateMember;
import com.codesquad.team3.issuetracker.domain.member.dto.response.ResponseMember;
import com.codesquad.team3.issuetracker.domain.member.service.MemberService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<ResponseMember> signUp(@RequestBody @Validated CreateMember createRequest) {
        ResponseMember createdMember = memberService.save(createRequest);
        return ResponseEntity.ok(createdMember);
    }

    @GetMapping
    public ResponseEntity<List<ResponseMember>> showAll() {
        List<ResponseMember> allMembers = memberService.findAll();
        return ResponseEntity.ok(allMembers);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseMember> showById(@PathVariable String id) {
        ResponseMember targetMember = memberService.findById(Integer.parseInt(id));
        return ResponseEntity.ok(targetMember);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseMember> updateById(@PathVariable String id,@RequestBody @Validated UpdateMember updateRequest) {
        ResponseMember updatedMember = memberService.update(Integer.parseInt(id), updateRequest);
        return ResponseEntity.ok(updatedMember);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseMember> deleteById(@PathVariable String id) {
        ResponseMember deletedMember = memberService.softDeleteById(Integer.parseInt(id));
        return ResponseEntity.ok(deletedMember);
    }
}
