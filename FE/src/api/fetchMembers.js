const ID_LOGIN_API_URI = '/api/login';

/**
 * 아이디로 로그인
 * @param {Object} - {id, password}
 * @returns {Object} - { result:boolean, data:{email, id, nickname} };
    - 성공: 200
    - 데이터 바인딩 실패: 400
    - 로그인 실패 : 401
 */
export const fetchLogin = async ({ id, password }) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_TEAM_SERVER}${ID_LOGIN_API_URI}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, password }),
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        if (response.status === 200) {
            const result = await response.json();
            return { result: 'ok', data: result };
        }
    } catch (error) {
        throw error;
    }
};
