package codesquad.issuetracker.user;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Jwts.SIG;
import java.util.Date;
import javax.crypto.SecretKey;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class JwtTokenProvider {

    private final SecretKey secretKey;
    private final Long accessExpiration;

    public JwtTokenProvider() {
        secretKey = SIG.HS256.key().build();
        accessExpiration = 3600000L;
    }

    public String createAccessToken(String userId) {
        Date date = new Date();

        return Jwts.builder()
            .subject(userId)
            .signWith(secretKey)
            .issuedAt(date)
            .expiration(new Date(date.getTime() + accessExpiration))
            .compact();
    }

    public boolean validateToken(String jws, String userId) {
        return (userId.equals(extractUsername(jws))) && !isTokenExpired(jws);
    }

    public Claims extractAllClaims(String jws) {
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(jws).getPayload();
    }

    public String extractUsername(String jws) {
        return extractAllClaims(jws).getSubject();
    }

    public boolean isTokenExpired(String jws) {
        return extractAllClaims(jws).getExpiration().before(new Date());
    }


}
