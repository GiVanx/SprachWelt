package com.sprachwelt;

import com.sprachwelt.repository.TextRepository;
import com.sprachwelt.service.TextService;
import com.sprachwelt.service.TextWithGapsService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@SpringBootApplication
@RestController
public class Application implements CommandLineRunner {

    @Autowired
    private TextRepository textRepository;

    @Autowired
    private TextService textService;

    @Autowired
    private TextWithGapsService textWithGapsService;

    @GetMapping("/user")
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
        return Collections.singletonMap("name", principal.getAttribute("name"));
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public ModelMapper getModelMapper() {
        return new ModelMapper();
    }

    @Override
    public void run(String... args) throws Exception {

        textRepository.deleteAll();

//        textService.add("You never know how things will turn out to be");
//
//        System.out.println(textRepository.findAll());
    }
}
