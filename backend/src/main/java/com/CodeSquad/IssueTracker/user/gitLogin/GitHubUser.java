package com.CodeSquad.IssueTracker.user.gitLogin;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.Persistable;
import org.springframework.data.relational.core.mapping.Table;

@Builder
@Getter
@Table("githubUsers")
public class GitHubUser implements Persistable<String> {
        @Id
        String githubId;
        String userId;
        String accessToken;

        @Transient
        private boolean isNew;
        @Override
        public String getId() {
                return githubId;
        }
        @Override
        public boolean isNew() {
                return isNew;
        }
}
