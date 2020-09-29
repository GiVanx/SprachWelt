package com.sprachwelt.auth;

import com.sprachwelt.auth.model.JwtAuthenticationToken;
import com.sprachwelt.auth.model.User;
import com.sprachwelt.auth.repository.UserRepository;
import com.sprachwelt.auth.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

public class JwtAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        System.out.println("Trying to authenticate with JwtAuthenticationProvider");
        JwtAuthenticationToken token = (JwtAuthenticationToken) authentication;

        String email = getUserEmail(token.getJwtToken());

        if (email != null) {

            User user = findUser(email);

            if (user != null) {
                System.out.println("Security context is now set!");
                return new CustomAuthenticationToken(user);
            }
        }

        return null;
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return JwtAuthenticationToken.class.isAssignableFrom(aClass);
    }

    private User findUser(String email) {
        User user = this.userRepository.findByEmail(email);
        if (user == null) {
            System.err.println("User '" + email + "' doesn't exist.");
        }
        return user;
    }

    private String getUserEmail(String jwtToken) {
        try {
            return this.jwtService.getEmailClaim(jwtToken);
        } catch (Exception e) {
            System.err.println("JWT Token is invalid");
        }
        return null;
    }
}
