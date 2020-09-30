package com.sprachwelt.auth;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sprachwelt.auth.dto.TokensDto;
import com.sprachwelt.auth.model.GoogleAuthenticationIdToken;
import com.sprachwelt.auth.model.User;
import com.sprachwelt.auth.repository.UserRepository;
import com.sprachwelt.auth.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class GoogleAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService tokenService;

    @Autowired
    @Override
    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        super.setAuthenticationManager(authenticationManager);
    }

    public GoogleAuthenticationFilter(String defaultFilterProcessesUrl) {
        super(defaultFilterProcessesUrl);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {

        System.out.println("GoogleAuthFilter: Attempt authentication");

        String idTokenString = request.getHeader("idToken");

        Authentication authToken;

        if (idTokenString != null) {
            authToken = getAuthenticationManager().authenticate(new GoogleAuthenticationIdToken(null, idTokenString));
        } else {
            System.out.println("'idToken' not found. Setting dummy user.");
            // used only for testing
            authToken = new CustomAuthenticationToken(createDummy());
            authToken.setAuthenticated(true);
        }

        SecurityContextHolder.getContext().setAuthentication(authToken);
        System.out.println("SecurityContext is now set!");
        return authToken;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        chain.doFilter(request, response);
    }

    private User createDummy() {

        User user = userRepository.findByEmail("peter.pan@gmail.com");

        if (user == null) {
            user = User.builder().name("Peter Pan")
                    .email("peter.pan@gmail.com").build();
            return userRepository.save(user);
        }
        return user;
    }
}
