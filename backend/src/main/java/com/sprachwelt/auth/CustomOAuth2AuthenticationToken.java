package com.sprachwelt.auth;

import com.sprachwelt.auth.model.User;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class CustomOAuth2AuthenticationToken extends AbstractAuthenticationToken {

    private User registeredUser;

    public CustomOAuth2AuthenticationToken(Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
    }

    public CustomOAuth2AuthenticationToken(User registeredUser) {
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
