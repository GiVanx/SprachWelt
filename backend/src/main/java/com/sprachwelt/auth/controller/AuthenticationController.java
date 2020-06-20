package com.sprachwelt.auth.controller;

import com.sprachwelt.auth.CustomOAuth2AuthenticationToken;
import com.sprachwelt.auth.model.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

public class AuthenticationController {

    @GetMapping("/google_login")
    public User login(Principal user) {
        CustomOAuth2AuthenticationToken token = (CustomOAuth2AuthenticationToken) SecurityContextHolder.getContext().getAuthentication();
        return (User) token.getPrincipal();
    }
}
