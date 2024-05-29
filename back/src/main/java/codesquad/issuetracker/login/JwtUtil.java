package codesquad.issuetracker.login;

import codesquad.issuetracker.config.LoginInterceptor;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private static final int EXPIRATION_TIME = 10 * 60 * 60 * 1000; // 10시간
    // yml 파일로 옮길 예정입니다.
    private final String secretKey = "de76904823dca363781d9b54e8b744687760fcbbe740cf3a659d47d85385225c69358fd98b7bcfa6949084eef0bfcaa393e95f96f9de75160a2a9438cec974bd"; // 512 bits 이상
    private static final String AUTHORIZATION_HEADER_START = "Bearer ";
    private static final String TOKEN_TYPE = "JWT";
    private static final String HASH_ALGORITHM = "HS512";

    public String createToken(String userId) {
        return Jwts.builder()
                .setHeaderParam("typ", TOKEN_TYPE)
                .setHeaderParam("alg", HASH_ALGORITHM)
                .claim(LoginInterceptor.LOGIN_ID, userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()), SignatureAlgorithm.HS512)
                .compact();
    }

    public String validateToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(secretKey.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.get(LoginInterceptor.LOGIN_ID).toString();
    }

    public String getJwtTokenFromHeader(String authorizationHeader) {
        if (authorizationHeader != null && authorizationHeader.startsWith(AUTHORIZATION_HEADER_START)) {
            return authorizationHeader.substring(7);
        }
        return null;
    }
}
