/// <reference types="react-scripts" />

//DB DATA TYPE
interface Label {
	id: number;
	name: string;
	description: string;
	backgroundColor: string;
	textBright: boolean;
}

interface Issue {
	id: number;
	title: string;
	open: boolean;
	content: string;
	timestamp: string;
	writer: string;
	milestone_name: string;
	comments: IssueComment[];
	labels: Label[];
}

interface IssueComment {
	id: number;
	writer: string;
	timestamp: string;
	content: string;
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

interface MilestoneCounts {
	closedCount: number;
	openedCount: number;
	totalCount: number;
}
