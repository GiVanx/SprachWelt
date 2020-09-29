package com.sprachwelt.auth.controller;

import com.sprachwelt.auth.dto.TokensDto;
import com.sprachwelt.auth.model.User;
import com.sprachwelt.auth.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class AuthenticationController {

    @Autowired
    private JwtService tokenService;

    @PostMapping("/google")
    public TokensDto login() {
        System.out.println("AuthenticationController: Google Login Endpoint");
        return this.generateTokens();
    }

    @PostMapping("/refresh-token")
    public TokensDto refreshToken() {
        System.out.println("AuthenticationController: Refresh token");
        return this.generateTokens();
    }

    public TokensDto generateTokens() {
        User loggedInUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String jwtToken = this.tokenService.generateToken(loggedInUser);
        return TokensDto.builder().jwtToken(jwtToken).build();
    }
}
