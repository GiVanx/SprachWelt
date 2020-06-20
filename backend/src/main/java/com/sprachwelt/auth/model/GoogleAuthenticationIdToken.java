package com.sprachwelt.auth.model;

import lombok.*;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

@Setter
@Getter
public class GoogleAuthenticationIdToken extends AbstractAuthenticationToken {

    private String idToken;

    public GoogleAuthenticationIdToken(Collection<? extends GrantedAuthority> authorities, String idToken) {
        super(authorities);
        this.idToken = idToken;
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return null;
    }
}
