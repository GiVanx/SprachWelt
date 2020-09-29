package com.sprachwelt.auth;

import com.sprachwelt.auth.model.JwtAuthenticationToken;
import com.sprachwelt.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    static final String AUTHORIZATION_HEADER = "Authorization";
    static final String BEARER_SCHEMA = "Bearer";

    @Autowired
    private UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {

        System.out.println("JwtAuthenticationFilter: JWT processing! " + request.getRequestURL());

        String authHeader = request.getHeader(AUTHORIZATION_HEADER);

        if (authHeader != null && authHeader.startsWith(BEARER_SCHEMA)) {
            String jwtToken = authHeader.split(" ")[1];

            SecurityContextHolder.getContext().setAuthentication(new JwtAuthenticationToken(jwtToken));
        } else {
            System.out.println("Valid Bearer schema Authorization header was not found!");
        }

        chain.doFilter(request, response);
    }
}
