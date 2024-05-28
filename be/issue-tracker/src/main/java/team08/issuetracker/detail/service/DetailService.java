package team08.issuetracker.detail.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import team08.issuetracker.comment.service.CommentService;
import team08.issuetracker.issue.service.IssueService;
import team08.issuetracker.label.service.LabelService;
import team08.issuetracker.member.service.MemberService;
import team08.issuetracker.milestone.service.MilestoneService;


@Service
@RequiredArgsConstructor
public class DetailService {
    private final IssueService issueService;
    private final CommentService commentService;
    private final MemberService memberService;
    private final LabelService labelService;
    private final MilestoneService milestoneService;

    // Mango

    /*
    * Label Dto [List]
    * 1) Label 이름
    * 2) Label 배경 색깔
    * 3) Label 글씨 밝기
    * */

    // 코멘트 개수 -> long 값


    /*
    * Comment Dto [List]
    * 1) Writer의 프로필 이미지
    * 2) Writer 이름
    * 3) 작성 시간 CreatedAt
    * 4) 내용
    * */


    // 심바

    /*
    * Issue Dto
    * 1) 이슈 아이디
    * 2) 이슈 제목
    * 3) 이슈 오픈 여부
    * 4) 이슈 작성 시간 -> 시간 값 그대로 보낼건지 아니면, 지금 시간이랑 비교해서 몇분전, ㅂ몇시간전, ...
    * */

    /*
    * Assignee Dto
    * 1) 담당자 프로필 이미지 -> assignee ..?
    * 2) ->
    * */


    // 준마이

    /*
    * Milestone Dto
    * 1) 마일스톤 이름
    * 2) 마일스톤 진척도 -> ...계산?!
    * */
}
