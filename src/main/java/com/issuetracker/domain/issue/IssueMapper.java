package com.issuetracker.domain.issue;

import com.issuetracker.domain.issue.request.IssueUpdateRequest;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface IssueMapper {
    void update(IssueUpdateRequest form);
}
