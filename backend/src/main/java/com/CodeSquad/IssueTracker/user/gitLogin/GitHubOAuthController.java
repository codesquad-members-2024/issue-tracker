package com.CodeSquad.IssueTracker.user.gitLogin;

import com.CodeSquad.IssueTracker.user.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequestMapping("/auth/github")
public class GitHubOAuthController {
    private final GitHubOauthService gitHubOauthService;

    public GitHubOAuthController(GitHubOauthService gitHubOauthService) {
        this.gitHubOauthService = gitHubOauthService;
    }

    @GetMapping("/login")
    public ResponseEntity<Void> githubLogin(@Value("${github.client.id}") String clientId) {
        String redirectUrl = "https://github.com/login/oauth/authorize?client_id=" + clientId;
        return ResponseEntity.status(HttpStatus.FOUND).location(URI.create(redirectUrl)).build();
    }

    @GetMapping("/callback")
    public ResponseEntity<String> githubCallback(@RequestParam("code") String code) {
            String accessToken = gitHubOauthService.getAccessToken(code);
            String gitHubUserId = gitHubOauthService.getUserLogin(accessToken);

            User user = gitHubOauthService.saveOrGetGithubUser(gitHubUserId);
            // User user = gitHubOauthService.saveUserAndGenerateToken(gitHubUserId, accessToken);
            String jwtToken = gitHubOauthService.generateJwtToken(user);

        return ResponseEntity.ok(jwtToken);
    }
}
