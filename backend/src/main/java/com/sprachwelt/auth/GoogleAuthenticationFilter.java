package com.sprachwelt.auth;

import com.sprachwelt.auth.model.GoogleAuthenticationIdToken;
import com.sprachwelt.auth.model.User;
import com.sprachwelt.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class GoogleAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    @Override
    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        super.setAuthenticationManager(authenticationManager);
    }

    public GoogleAuthenticationFilter(String defaultFilterProcessesUrl) {
        super(defaultFilterProcessesUrl);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) throws AuthenticationException, IOException, ServletException {

        String idTokenString = httpServletRequest.getParameter("googleIdToken");

        if (idTokenString != null) {
            return getAuthenticationManager().authenticate(new GoogleAuthenticationIdToken(null, idTokenString));
        } else {
            // used only for testing
            CustomOAuth2AuthenticationToken token = new CustomOAuth2AuthenticationToken(createDummy());
            SecurityContextHolder.getContext().setAuthentication(token);
            return token;
        }
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
