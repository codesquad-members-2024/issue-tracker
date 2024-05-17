import styled from "styled-components";

function RefreshRequest() {
  return (
    <>
      <BlurBackground />
      <Snackbar>
        <span>서버 연결에 오류가 발생하였습니다! <br /> 새로고침 하시겠습니까?</span>
        <button onClick={() => window.location.reload()}>새로고침</button>
      </Snackbar>
    </>
  );
}

const BlurBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: 0.7;
  z-index: 10;
`;

const Snackbar = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2em;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.14286em;
  font-weight: 500;
  color: #fff;
  padding: 1.14286em 1.71429em;
  background-color: #4362d0;
  z-index: 11;
`;

export default RefreshRequest;
