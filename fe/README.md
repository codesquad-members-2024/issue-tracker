# FE 설계

- 디자인 시스템 : 재사용 할 수 있는 컴포넌트.(피그마에 있는 파운데이션 보고 컴포넌트 만들자)

  - 원래 이렇게 디자인 시스템 컴포넌트를 만들고 시작하는게 좋다.

- 디렉토리는 기본적으로 화면에 보이는걸 잡고
  보통 여기저기 사용되는 컴포넌트는 common 폴더를 만들고
  ui 컴포넌트가 있을 수도 있고(이게 디자인 시스템) 비ui 컴포넌트(헬퍼펑션)가 있음

기본적으로는 화면단위로 만들면 된다.

<페이지 이동>
서버에서는 페이지 이동할 때마다(요청이 들어올때마다) 매번 쿠키를 판단을 함
쿠키는 http 요청에 따라다님 모든 http 리퀘스트에 쿠키가 포함되어있음
그래서 페이지 단위 로그인의 경우는 서버에서 쿠키에 세션이 있네? 유효한가? 하고 확인해서 응답을 주는거임
세션은 서버에서 저장(세션 정보를 백에서 관리)

<싱글페이지>
근데 요즘은 싱글페이지니까 새로고침이 안일어남
서버는 json을 주고 우리가 그림
그럼 로그인은 어떻게하냐? 서버에서 토큰 정보를 주고 이걸
로컬스토리지에 저장해 둠
그래서 로컬스토리지에 저장해 둔 토큰을 확인하는 거임

그럼 로그아웃을 누르면? 토큰 삭제
세션은 로그아웃시 서버로 요청

쿠키 = 임시적인 데이터베이스
다크모드나 이런거 쿠키에 저장
이게 보안에 노출되기도 해서 스토리지를 만듬
스토리지 종류는 로컬(창닫혀도 존재), 세션(창닫히면 삭제)

세션스토리지 쓸 일은 없음
로컬스토리지(=개인에 관련된) - 최근검색어, 다크모드, 토큰 등등

```
fetch('https://issue-tracker-team08.site/xxx',{
method: "POST",
credentials: "include",
headers: {
"Content-Type": "application/json",
},
body: '{"memberId" : "sdasdasd2123", "password" : "mime2221234"}',
}).then(console.log)
```
```
망고 로컬 서버

CREATE
fetch('http://192.168.1.38:8080/label',{
method: "POST",
headers: {
"Content-Type": "application/json",
},
body:`{"backgroundColor": "#dfdeff", "description": "ss", "name": "미메가 생성", "textBright": "false"}`
}).then(res=>res.json()).then(console.log)


READ
fetch('http://192.168.1.38:8080/label',{
method: "GET",
headers: {
"Content-Type": "application/json",
},
}).then(res=>res.json()).then(console.log)

UPDATE
fetch('http://192.168.1.38:8080/label/3',{
method: "PATCH",
headers: {
"Content-Type": "application/json",
},
    body:`{"backgroundColor": "#dfdeff", "description": "ss", "name": "미메가 수정", "textBright": "false"}`
}).then(res=>res.json()).then(console.log)

DELETE
fetch('http://192.168.1.38:8080/label/8',{
method: "DELETE",
headers: {
"Content-Type": "application/json",
},
}).then(res=>res.json()).then(console.log)

---
심바 CRUD

GET
fetch('http://192.168.1.32:8080/issue',{
method: "GET",
headers: {
"Content-Type": "application/json",
},
}).then(res=>res.json()).then(console.log)

POST(생성)
fetch('http://192.168.1.32:8080/issue',{
method: "POST",
headers: {
"Content-Type": "application/json",
}, 
body:JSON.stringify({
  "title": "sdas",
  "writer": "asddsa",
  "content": "첫줄\n둘째줄",
  "labelIds": [1, 2, 3, 4],
  "assigneeIds": ["abc", "def"],
  "file": "abcd.img",
  "milestoneId": 1
  })
}).then(res=>res.json()).then(console.log)

---

문제상황
겹치는 컴포넌트가 많다 중복되는 건 어떻게 합칠까?
처음에는 props로 다 넘겨줬는데 그랬더니 props도 많아지고 조건절 렌더링을 하니까 코드도 더러워짐
-> HOC 활용

에러 바운더리 사용해보자
로그인 / 마일스톤

