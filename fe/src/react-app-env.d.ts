/// <reference types="react-scripts" />

//DB DATA TYPE
interface Label {
	id: number;
	name: string;
	description: string;
	background_color: string;
	text_bright: boolean;
}

interface Milestone {
	id: number;
	is_open: boolean;
	open: number;
	closed: number;
	name: string;
	description: string;
	complete_date: string;
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
