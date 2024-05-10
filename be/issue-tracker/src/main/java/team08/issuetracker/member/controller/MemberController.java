package team08.issuetracker.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import team08.issuetracker.member.model.dto.MemberCreationDto;
import team08.issuetracker.member.service.MemberService;

@RestController
@Slf4j
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @PostMapping
    public ResponseEntity<String> registerUser(@RequestBody MemberCreationDto memberCreationDto) {
        memberService.registerUser(memberCreationDto);

        return ResponseEntity.ok("회원가입 성공!");
    }
}
