package team08.issuetracker.jwt;


import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import team08.issuetracker.member.model.Member;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
@Slf4j
public class JwtService {
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expirationTime}")
    private long expirationTime;

    public String createJwtToken(Member member) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expirationTime);

        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setHeaderParam("alg", "HS512")
                .setSubject("access-token")
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .claim("member_id", member.getMemberId())
                .signWith(SignatureAlgorithm.HS512, secret)
                .compact();
    }

    public boolean parseJwtToken(String token) {
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secret)
                    .parseClaimsJws(token)
                    .getBody();

            System.out.println("JWT Subject : " + claims.getSubject());

            System.out.println("JWT Token MemberId : " + claims.get("member_id"));

            return true;

        } catch (SignatureException e) {
            log.error("Invalid JWT signature.");
        } catch (MalformedJwtException e) {
            log.error("Invalid JWT token.");
        } catch (ExpiredJwtException e) {
            log.error("Expired JWT token.");
        } catch (UnsupportedJwtException e) {
            log.error("Unsupported JWT token.");
        } catch (IllegalArgumentException e) {
            log.error("JWT claims string is empty.");
        } catch (NullPointerException e) {
            log.error("JWT Token is empty.");
        }

        return false;
    }


}
