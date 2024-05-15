import { server, devServer } from '~/apis/baseApi';

/**
 * 이슈 상세 조회 API
 * @url http://3.38.30.88:8080/issues/{id}
 * @param {number} id : 이슈 id
 * @returns {object} : 이슈 상세 정보
 */
const prod = `${server}/detail?id=1`;
const dev = `${devServer}/detail?id=1`;
export async function getIssueDetail(id) {
	try {
		const response = await fetch(dev).then(res => res.json());
		const data = response;
		return data;
	} catch (error) {
		console.error(error);
		throw new Error('이슈 상세 조회에 실패했습니다.');
	}
}

/**
 * Response Example
{
  "id": 1,
  "title": "title1",
  "content": "my name is daniel",
  "milestoneId": "m1",
  "assignees": [
    {
      "loginId": "mellisa",
      "profileImage": "https://avatars.githubusercontent.com/u/140429591?s=40&v=4"
    },
    {
      "loginId": "wade",
      "profileImage": "https://avatars.githubusercontent.com/u/126778700?s=40&v=4"
    }
  ],
  "writer": "daniel",
  "createTime": "2024-05-14T04:41:45.318597316",
  "labels": [
    {
      "name": "bug",
      "description": "bug",
      "color": "#0075ca"
    },
    {
      "name": "documentation",
      "description": "documentation",
      "color": "#008672"
    }
  ],
  "closed": false
}

*/
