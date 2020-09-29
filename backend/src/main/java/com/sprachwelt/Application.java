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
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class Application implements CommandLineRunner {

    @Autowired
    private TextRepository textRepository;

    @Autowired
    private TextService textService;

    @Autowired
    private TextWithGapsService textWithGapsService;

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
