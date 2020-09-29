package com.sprachwelt.auth;

import com.sprachwelt.auth.model.User;
import org.springframework.security.authentication.AbstractAuthenticationToken;

public class CustomAuthenticationToken extends AbstractAuthenticationToken {

    private User registeredUser;

    public CustomAuthenticationToken(User registeredUser) {
        super(null);
        this.registeredUser = registeredUser;
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return registeredUser;
    }
}
