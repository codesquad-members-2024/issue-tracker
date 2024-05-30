package team08.issuetracker.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import team08.issuetracker.jwt.JwtService;
import team08.issuetracker.member.model.Member;
import team08.issuetracker.member.model.dto.MemberCreationResponse;
import team08.issuetracker.member.model.dto.MemberCreationRequest;
import team08.issuetracker.member.model.dto.MemberLoginRequest;
import team08.issuetracker.member.model.dto.MemberLogoutResponse;
import team08.issuetracker.member.model.dto.MemberOverviewResponse;
import team08.issuetracker.member.service.MemberService;

@RestController
@Slf4j
@RequestMapping("/member")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final JwtService jwtService;

    private static final long TOKEN_DURATION_90DAYS = 90 * 24 * 60 * 60;
    private static final String TOKEN_NAME = "jwt-token";
    private static final String TOKEN_HEADER_VALUE = "Bearer ";

    @GetMapping("/list")
    public ResponseEntity<MemberOverviewResponse> getAllMembers() {
        MemberOverviewResponse memberOverviewResponse = memberService.findAllMembers();
        return ResponseEntity.ok(memberOverviewResponse);
    }

    @PostMapping
    public ResponseEntity<MemberCreationResponse> registerMember(@RequestBody MemberCreationRequest memberCreationRequest) {

        Member member = memberService.registerMember(memberCreationRequest);

        MemberCreationResponse response = MemberCreationResponse.from(member);

        log.debug(response.getMessage());

        return ResponseEntity.ok(response);
    }

    @CrossOrigin(exposedHeaders = {"Authorization", "Set-Cookie"})
    @PostMapping("/login")
    public ResponseEntity<?> loginMember(@RequestBody MemberLoginRequest memberLoginRequest) {
        Member member = memberService.loginMember(memberLoginRequest);

        String token = jwtService.createJwtToken(member);

        HttpCookie httpCookie = ResponseCookie.from(TOKEN_NAME, token)
                .maxAge(TOKEN_DURATION_90DAYS)
                .httpOnly(true)
                .secure(true)
                .sameSite("None")
                .path("/")
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, httpCookie.toString())
                .header(HttpHeaders.AUTHORIZATION, TOKEN_HEADER_VALUE + token)
                .build();
    }

    /* TODO : validate url 삭제하기
     *   - intercepter 사용하여 로그인 쿠키 토큰 검증하기
     *   - jwtService의 validate 분리하기
     * */
//    @GetMapping("/validate")
//    public ResponseEntity<?> validateToken(@CookieValue(name = TOKEN_NAME) String jwtToken) {
//        if (!jwtService.parseJwtToken(jwtToken)) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("인증되지 않은 토큰");
//        }
//
//        return ResponseEntity.ok("검증 성공");
//    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutMember() {
        ResponseCookie responseCookie = ResponseCookie.from(TOKEN_NAME, "")
                .maxAge(0)
                .path("/")
                .build();

        MemberLogoutResponse response = new MemberLogoutResponse();

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, responseCookie.toString())
                .body(response);
    }

}
