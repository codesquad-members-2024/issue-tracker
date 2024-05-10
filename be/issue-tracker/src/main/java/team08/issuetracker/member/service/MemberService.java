package team08.issuetracker.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import team08.issuetracker.exception.member.InvalidRegisterFormException;
import team08.issuetracker.member.model.Member;
import team08.issuetracker.member.model.dto.MemberCreationDto;
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

    public void registerUser(MemberCreationDto memberCreationDto) {
        validateRegisterForm(memberCreationDto);

        Member member = new Member(memberCreationDto.getMemberId(), memberCreationDto.getPassword());

        memberRepository.save(member);

        log.info("회원가입 성공! 아이디 : {}", member.getMemberId());
    }

    private void validateRegisterForm(MemberCreationDto memberCreationDto) {
        String memberId = memberCreationDto.getMemberId();
        String password = memberCreationDto.getPassword();

        // 1) id, pw에 대한 공백 검증
        if (memberId.isEmpty() || password.isEmpty()) {
            log.error("id, pw 중에 공백이 있습니다.");
            throw new InvalidRegisterFormException();
        }

        // 2) id의 정규식 검사 + 길이 검사
        Matcher idMatcher = Pattern.compile(ID_REGEX).matcher(memberId);
        if (!idMatcher.matches()) {
            log.error("id가 형식에 맞지 않습니다.");
            throw new InvalidRegisterFormException();
        }

        // 3) pw의 정규식 검사 + 길이 검사
        Matcher passwordMatcher = Pattern.compile(PW_REGEX).matcher(password);
        if (!passwordMatcher.matches()) {
            log.error("pw가 형식에 맞지 않습니다.");
            throw new InvalidRegisterFormException();
        }
    }

}
