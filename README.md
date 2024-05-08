- "/" : 로그인 페이지
- "/open" : 오픈페이지
- "/closed" : 클로즈 페이지
- "/labels" : 레이블 페이지
- "/milestones" : 마일스톤 페이지
- "/news" : news 이슈 페이지

- 로그인 확인 버튼을 누르면 open 페이지로 이동
- replace: true로 설정하면 뒤로가기 불가능
```
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const onClick = () => {
	navigate("/", { replace: true });

}
```
