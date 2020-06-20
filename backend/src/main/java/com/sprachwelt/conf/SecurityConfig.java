package com.sprachwelt.conf;

import com.sprachwelt.auth.GoogleAuthenticationProvider;
import com.sprachwelt.auth.GoogleAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/google_login").anonymous()
                .anyRequest().authenticated()
                .and()
                .logout()
                .logoutUrl("/logout")
        .and()
        .addFilter(googleAuthenticationFilter())
        .oauth2Login();
    }

    @Autowired
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(googleAuthenticationProvider());
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public GoogleAuthenticationFilter googleAuthenticationFilter() {
        return new GoogleAuthenticationFilter("/google_login");
    }

    @Bean
    public GoogleAuthenticationProvider googleAuthenticationProvider() {
        return new GoogleAuthenticationProvider();
    }
}
