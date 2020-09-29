package com.sprachwelt.auth;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.sprachwelt.auth.model.GoogleAuthenticationIdToken;
import com.sprachwelt.auth.model.User;
import com.sprachwelt.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import java.util.Collections;

public class GoogleAuthenticationProvider implements AuthenticationProvider {

    private final static String NAME = "name";
    private final static String PICTURE = "picture";

    @Autowired
    private UserRepository userRepository;

    @Value("spring.security.oauth2.client.registration.google.client-id")
    private String clientId;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        System.out.println("Trying to authenticate with GoogleAuthenticationProvider");
        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), new JacksonFactory())
                .setAudience(Collections.singletonList(clientId)).build();

        GoogleAuthenticationIdToken authIdToken = (GoogleAuthenticationIdToken) authentication;

        try {
            GoogleIdToken idToken = verifier.verify(authIdToken.getIdToken());

            if (idToken != null) {
                return getToken(idToken.getPayload());
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public boolean supports(Class<?> aClass) {
        return aClass.isAssignableFrom(GoogleAuthenticationIdToken.class);
    }

    private String get(GoogleIdToken.Payload idTokenPayload, String property) {
        return (String) (idTokenPayload.get(property));
    }

    private CustomAuthenticationToken getToken(GoogleIdToken.Payload idTokenPayload) {

        User user = userRepository.findByEmail(idTokenPayload.getEmail());
        if (user == null) {
            user = User.builder().email(idTokenPayload.getEmail())
                    .name(get(idTokenPayload, NAME)).picture(get(idTokenPayload, PICTURE)).build();
            user = userRepository.save(user);
        }
        return new CustomAuthenticationToken(user);
    }
}
