/// <reference types="react-scripts" />

//DB DATA TYPE
//Issue
interface IssueDataType {
	issueCounts: IssueCounts;
	issues: Issue[];
}
interface IssueCounts {
	closedCount: number;
	openedCount: number;
	totalCount: number;
}
interface Issue {
	id: number;
	title: string;
	state: boolean;
	content?: string;
	timestamp: string;
	createdAt: string;
	writer: string;
	milestoneName: string;
	assignees: [];
	comments?: IssueComment[];
	labels: Label[];
}
interface IssueComment {
	id: number;
	writer: string;
	timestamp: string;
	content: string;
}

//Milestone
interface MilestonesDataType {
	milestoneCounts: MilestoneCounts;
	milestones: Milestone[];
}
interface MilestoneCounts {
	closedCount: number;
	openedCount: number;
	totalCount: number;
}
interface Milestone {
	id: number;
	state: boolean;
	name: string;
	description: string;
	completeDate: string;
	openedIssueCount: number;
	closedIssueCount: number;
	milestoneProgress: number;
}

//Label
interface LabelDataType {
	labelCount: { totalCount: number };
	labels: Label[];
}
interface Label {
	id: number;
	name: string;
	description: string;
	backgroundColor: string;
	textBright: boolean;
}

//Member
interface MemberDataType {
	members: Member[];
}
interface Member {
	memberId: string;
	profileImage: string;
}
