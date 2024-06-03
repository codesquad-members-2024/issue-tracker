import { useQueries, useQuery } from '@tanstack/react-query';
import { fetchIssueListData } from '../api/fetchFilterData';
import { useFilterContext } from '../context/FilterContext';
import { getUserId } from '../utils/userUtils';

const filterTypeIsClosed = (selectedFilters) => {
    if (!selectedFilters || Object.keys(selectedFilters).length === 0 || !selectedFilters.issues) return;

    const issues = selectedFilters.issues || {};
    if (issues.isOpen === null && issues.isClosed === null) return false;
    else return Object.entries(issues).filter(([key, value]) => (key === 'isOpen' || key === 'isClosed') && value !== null)[0][0] === 'isClosed';
};

const filterTypeAuthorId = (selectedFilters, userId) => {
    if (!selectedFilters || Object.keys(selectedFilters).length === 0) return;

    const authorObj = Object.entries(selectedFilters).filter(([key, value]) => key === 'author' && value !== null && value !== 'nonSelected');
    if (authorObj.length) return authorObj[0][1];

    const issuesObj = Object.entries(selectedFilters.issues).filter(
        ([key, value]) => key === 'authorMe' && value !== null && value !== 'nonSelected'
    );
    if (issuesObj.length) return userId;

    return '';
};

const filterTypeAssigneeId = (selectedFilters, userId) => {
    if (!selectedFilters || Object.keys(selectedFilters).length === 0) return;

    const assigneeObj = Object.entries(selectedFilters).filter(([key, value]) => key === 'assignee' && value !== null && value !== 'nonSelected');
    if (assigneeObj.length) return assigneeObj[0][1];

    const issuesObj = Object.entries(selectedFilters.issues).filter(
        ([key, value]) => key === 'assigneeMe' && value !== null && value !== 'nonSelected'
    );
    if (issuesObj.length) return userId;

    return '';
};

const filterTypeNoValues = (selectedFilters) => {
    if (!selectedFilters || Object.keys(selectedFilters).length === 0) return;

    const nonSelectedObj = Object.entries(selectedFilters).filter(([key, value]) => value === 'nonSelected');
    if (nonSelectedObj.length) {
        return nonSelectedObj.map((e) => e[0]).join(';');
    }
    return '';
};

export const usefilteredIssueData = () => {
    const { state: selectedFilters } = useFilterContext();
    const userId = getUserId();

    const isClosedParam = filterTypeIsClosed(selectedFilters);
    const authorIdParam = filterTypeAuthorId(selectedFilters);
    const assigneeIdParam = filterTypeAssigneeId(selectedFilters, userId);
    const labelIdParam = selectedFilters.label || '';
    const milestoneNameParam = selectedFilters.milestone || '';
    const noValuesParam = filterTypeNoValues(selectedFilters);
    return useQuery({
        queryKey: ['issue_list'],
        queryFn: () => fetchIssueListData(isClosedParam, authorIdParam, assigneeIdParam, labelIdParam, milestoneNameParam, noValuesParam, userId),
        enabled: !!selectedFilters, // selectedFilters가 유효하면 쿼리 실행
        // staleTime: 1000 * 60 * 5,
        Suspense: true,
    });
};
