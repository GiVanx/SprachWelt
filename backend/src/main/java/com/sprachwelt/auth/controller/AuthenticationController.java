package com.sprachwelt.auth.controller;

import com.sprachwelt.auth.dto.TokensDto;
import com.sprachwelt.auth.exception.UserAlreadyRegisteredException;
import com.sprachwelt.auth.exception.UserNotRegisteredException;
import com.sprachwelt.auth.model.User;
import com.sprachwelt.auth.repository.UserRepository;
import com.sprachwelt.auth.service.JwtService;
import com.sprachwelt.facade.UserFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthenticationController {

    @Autowired
    private JwtService tokenService;
    @Autowired
    private UserFacade userFacade;

    @PostMapping("/login/google")
    public TokensDto login() {
        System.out.println("AuthenticationController: Google Login Endpoint");
        User authenticatedUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User dbUser = userFacade.findByEmail(authenticatedUser.getEmail());
        if (dbUser == null) {
            throw new UserNotRegisteredException(authenticatedUser);
        }
        return this.generateTokens(dbUser);
    }

    @PostMapping("/register/google")
    public TokensDto register() {
        System.out.println("AuthenticationController: Google Login Endpoint");
        User authenticatedUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User dbUser = userFacade.findByEmail(authenticatedUser.getEmail());
        if (dbUser != null) {
            throw new UserAlreadyRegisteredException(dbUser);
        }

        dbUser = userFacade.save(authenticatedUser);
        return this.generateTokens(dbUser);
    }

    @PostMapping("/refresh-token")
    public TokensDto refreshToken() {
        System.out.println("AuthenticationController: Refresh token");
        User authenticatedUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return this.generateTokens(authenticatedUser);
    }


    public TokensDto generateTokens(User user) {
        String jwtToken = this.tokenService.generateToken(user);
        return TokensDto.builder().jwtToken(jwtToken).build();
    }
}
