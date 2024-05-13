package team08.issuetracker.member.controller;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import team08.issuetracker.jwt.JwtService;
import team08.issuetracker.member.model.Member;
import team08.issuetracker.member.model.MemberResponse;
import team08.issuetracker.member.model.dto.MemberCreationDto;
import team08.issuetracker.member.model.dto.MemberLoginDto;
import team08.issuetracker.member.service.MemberService;

@RestController
@Slf4j
@RequestMapping("/member")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MemberController {
    private final MemberService memberService;
    private final JwtService jwtService;

    @PostMapping
    public ResponseEntity<String> registerMember(@RequestBody MemberCreationDto memberCreationDto) {
        memberService.registerMember(memberCreationDto);

        return ResponseEntity.ok("회원가입 성공!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginMember(@RequestBody MemberLoginDto memberLoginDto) {
        Member member = memberService.loginMember(memberLoginDto);

        MemberResponse response = new MemberResponse(member.getMemberId(), jwtService.createJwtToken(member));

        HttpCookie httpCookie = ResponseCookie.from("jwt-token", response.getToken())
                .maxAge(7776000)
                .httpOnly(true)
                .secure(true)
                .path("/")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, httpCookie.toString())
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + response.getToken())
                .build();
    }

    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(@CookieValue(name = "jwt-token") String jwtToken) {
        if (!jwtService.parseJwtToken(jwtToken)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증되지 않은 토큰");
        }

        return ResponseEntity.ok("검증 성공");
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutMember() {

        ResponseCookie responseCookie = ResponseCookie.from("jwt-token", "")
                .maxAge(0)
                .path("/")
                .build();

        return ResponseEntity
                .status(HttpStatus.OK)
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .build();
    }
}
