package com.sprachwelt.auth.service;

import com.sprachwelt.auth.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.ZonedDateTime;
import java.util.Date;

@Component
public class JwtService {

    @Value("${jwt.secret}")
    private String jwtSecret;

    private String EMAIL_CLAIM_KEY = "email";
    private int TOKEN_LIFESPAN = 2; // expressed in hours

    public String generateToken(User user) {
        Claims customClaims = Jwts.claims();
        customClaims.put(EMAIL_CLAIM_KEY, user.getEmail());

        return Jwts.builder()
                .addClaims(customClaims)
                .setSubject(user.getName())
                .setIssuedAt(new Date())
                .setExpiration(Date.from(ZonedDateTime.now().plusHours(TOKEN_LIFESPAN).toInstant()))
                .signWith(getSigningKey())
                .compact();
    }

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public String getEmailClaim(String token) {
        return (String) this.parseToken(token).get(EMAIL_CLAIM_KEY);
    }

    public String getUsernameClaim(String token) {
        return (String) this.parseToken(token).getSubject();
    }

    public Claims parseToken(String jwt) {
        return Jwts.parserBuilder().setSigningKey(jwtSecret)
                .build().parseClaimsJws(jwt).getBody();
    }
}
