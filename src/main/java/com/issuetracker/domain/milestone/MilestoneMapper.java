package com.issuetracker.domain.milestone;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface MilestoneMapper {
    void update(Map<String, Object> requestMap);
}
