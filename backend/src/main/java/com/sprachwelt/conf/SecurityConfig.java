package com.sprachwelt.conf;

import com.sprachwelt.auth.GoogleAuthenticationFilter;
import com.sprachwelt.auth.GoogleAuthenticationProvider;
import com.sprachwelt.auth.JwtAuthenticationFilter;
import com.sprachwelt.auth.JwtAuthenticationProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        System.out.println("Security configuration!!!");
        http.cors().and().csrf().disable().authorizeRequests()
                .antMatchers("/login/**").permitAll()
                .and().authorizeRequests()
                .anyRequest().authenticated()
                .and()
                .logout()
                .logoutUrl("/logout")
                .and()
                .addFilterBefore(googleAuthenticationFilter(), BasicAuthenticationFilter.class)
                .addFilterBefore(jwtAuthenticationFilter(), GoogleAuthenticationFilter.class);
    }

    @Autowired
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(googleAuthenticationProvider());
        auth.authenticationProvider(jwtAuthenticationProvider());
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowCredentials(false);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public GoogleAuthenticationFilter googleAuthenticationFilter() {
        return new GoogleAuthenticationFilter("/login/google");
    }

    @Bean
    public GoogleAuthenticationProvider googleAuthenticationProvider() {
        return new GoogleAuthenticationProvider();
    }

    @Bean
    public JwtAuthenticationProvider jwtAuthenticationProvider() { return new JwtAuthenticationProvider(); }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }
}
