package com.issuetracker.domain.label;

import org.apache.ibatis.annotations.Mapper;

import java.util.Map;

@Mapper
public interface LabelMapper {

    void update(Map<String, Object> requestMap);
}
