package com.CodeSquad.IssueTracker.user.gitLogin;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Builder
@Table("githubUsers")
public record GitHubUser(
        @Id
        String githubId,
        String userId
){ }
