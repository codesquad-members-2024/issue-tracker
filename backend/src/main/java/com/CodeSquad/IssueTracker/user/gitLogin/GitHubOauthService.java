package com.CodeSquad.IssueTracker.user.gitLogin;

import com.CodeSquad.IssueTracker.Exception.user.UserNotFoundException;
import com.CodeSquad.IssueTracker.user.User;
import com.CodeSquad.IssueTracker.user.UserRepository;
import com.CodeSquad.IssueTracker.user.jwtlogin.JwtUtil;
import com.CodeSquad.IssueTracker.user.utils.RandomIdGenerator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class GitHubOauthService {
    private final String clientId;
    private final String clientSecret;
    private final RestTemplate restTemplate;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final GitHubUserRepository gitHubUserRepository;
    private final ConcurrentHashMap<String, String> accessTokenCache = new ConcurrentHashMap<>();

    public GitHubOauthService(@Value("${github.client.id}") String clientId,
                              @Value("${github.client.secret}") String clientSecret,
                              RestTemplate restTemplate, JwtUtil jwtUtil, UserRepository userRepository, GitHubUserRepository gitHubUserRepository) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.restTemplate = restTemplate;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.gitHubUserRepository = gitHubUserRepository;
    }

    public String getAccessToken(String code) {
        Map<String, String> body = new LinkedHashMap<>();
        body.put("client_id", clientId);
        body.put("client_secret", clientSecret);
        body.put("code", code);

        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_FORM_URLENCODED));

        HttpEntity<Map<String, String>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.postForEntity("https://github.com/login/oauth/access_token", entity, String.class);
        String[] responseParts = response.getBody().split("&");
        String accessToken = null;

        for (String part : responseParts) {
            if (part.startsWith("access_token=")) {
                accessToken = part.split("=")[1];
                break;
            }
        }

        return accessToken;
    }

    public String getUserLogin(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        headers.set("Authorization", "Bearer " + accessToken);

        HttpEntity<String> entity = new HttpEntity<>("body", headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                "https://api.github.com/user",
                HttpMethod.GET,
                entity,
                Map.class
        );

        return response.getBody().get("login").toString();
    }

    public User saveUserAndGenerateToken(String gitHubUserId, String gitHubAccessToken) {
        String existingAccessToken = accessTokenCache.get(gitHubUserId);

        User user;
        if (existingAccessToken == null || !existingAccessToken.equals(gitHubAccessToken)) {
            accessTokenCache.put(gitHubUserId, gitHubAccessToken);
            user = User.builder()
                    .userId(gitHubUserId)
                    .isNew(existingAccessToken == null)
                    .build();
            user = userRepository.save(user); // 새로운 사용자 추가 또는 기존 사용자 조회
        } else {
            user = userRepository.findById(gitHubUserId).orElse(null); // 기존 사용자 조회
            if (user == null) {
                user = User.builder()
                        .userId(gitHubUserId)
                        .isNew(false)
                        .build();
                user = userRepository.save(user); // 새로운 사용자 추가
            }
        }

        return user;
    }

    @Transactional
    public User saveOrGetGithubUser(String gitHubUserId) {
        GitHubUser gitHubUser = gitHubUserRepository.findById(gitHubUserId)
                .orElseGet(() -> {
                    String randomId = RandomIdGenerator.generateRandomId();

                    userRepository.save(User.builder()
                            .userId(randomId)
                            .isNew(true)
                            .build());

                    GitHubUser newUser = GitHubUser.builder()
                            .githubId(gitHubUserId)
                            .userId(randomId)
                            .build();

                    gitHubUserRepository.insertGitHubUser(newUser.githubId(), newUser.userId());
                    return newUser;
                });

        return userRepository.findById(gitHubUser.userId())
                                                    .orElseThrow(() -> new UserNotFoundException("해당하는 유저가 없습니다."));
    }

    public String generateJwtToken(User user) {
        return jwtUtil.generateToken(user.getUserId());
    }
}

