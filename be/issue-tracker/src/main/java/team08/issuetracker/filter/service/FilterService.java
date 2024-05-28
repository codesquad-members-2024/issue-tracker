package team08.issuetracker.filter.service;

import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import team08.issuetracker.filter.model.dto.FilteredIssueRequest;
import team08.issuetracker.filter.model.dto.FilteredIssueResponse;
import team08.issuetracker.issue.model.Issue;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FilterService {
    private final JdbcTemplate jdbcTemplate;

    public FilteredIssueResponse getFilteredIssues(FilteredIssueRequest request) {
        String query = request.toQuery();

        System.out.println(query);

        List<Issue> issueList = jdbcTemplate.query(query, new BeanPropertyRowMapper<>(Issue.class));

        return new FilteredIssueResponse(issueList);
    }

}
