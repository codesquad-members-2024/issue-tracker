package team08.issuetracker.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import team08.issuetracker.exception.member.InvalidRegisterFormException;
import team08.issuetracker.exception.member.MemberNotFoundException;
import team08.issuetracker.exception.member.MemberPasswordMismatchException;
import team08.issuetracker.member.model.Member;
import team08.issuetracker.member.model.dto.MemberCreationDto;
import team08.issuetracker.member.model.dto.MemberLoginDto;
import team08.issuetracker.member.repository.MemberRepository;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
@Slf4j
@RequiredArgsConstructor
public class MemberService {

    private static final String ID_REGEX = "^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d]{6,16}$";
    private static final String PW_REGEX = "^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d]{6,12}$";

    private final MemberRepository memberRepository;

    public void registerMember(MemberCreationDto memberCreationDto) {
        validateMemberForm(memberCreationDto.getMemberId(), memberCreationDto.getPassword());

        Member member = new Member(memberCreationDto.getMemberId(), memberCreationDto.getPassword());

        memberRepository.insert(member);

        log.info("회원가입 성공! 아이디 : {}", member.getMemberId());
    }

    public Member loginMember(MemberLoginDto memberLoginDto) {
        validateMemberForm(memberLoginDto.getMemberId(), memberLoginDto.getPassword());

        Member member = memberRepository.findById(memberLoginDto.getMemberId())
                .orElseThrow(MemberNotFoundException::new);

        validateLoginCredential(member, memberLoginDto.getPassword());

        return member;
    }

    private void validateLoginCredential(Member member, String inputPassword) {
        if (!member.getPassword().equals(inputPassword)) {
            throw new MemberPasswordMismatchException();
        }
    }

    private void validateMemberForm(String memberId, String password) {
        // 1) id, pw에 대한 공백 검증
        checkEmptyValue(memberId, password);

        // 2) id의 정규식 검사 + 길이 검사
        checkMemberIdFormat(memberId);

        // 3) pw의 정규식 검사 + 길이 검사
        checkPasswordFormat(password);
    }

    private void checkEmptyValue(String memberId, String password) {
        if (memberId.isEmpty()) {
            log.error("id에 공백이 있습니다.");
            throw new InvalidRegisterFormException();
        }

        if (password.isEmpty()) {
            log.error("pw에 공백이 있습니다.");
            throw new InvalidRegisterFormException();
        }
    }

    private void checkMemberIdFormat(String memberId) {
        Matcher idMatcher = Pattern.compile(ID_REGEX).matcher(memberId);
        if (!idMatcher.matches()) {
            log.error("id가 형식에 맞지 않습니다.");
            throw new InvalidRegisterFormException();
        }
    }

    private void checkPasswordFormat(String password) {
        Matcher passwordMatcher = Pattern.compile(PW_REGEX).matcher(password);
        if (!passwordMatcher.matches()) {
            log.error("pw가 형식에 맞지 않습니다.");
            throw new InvalidRegisterFormException();
        }
    }


}
