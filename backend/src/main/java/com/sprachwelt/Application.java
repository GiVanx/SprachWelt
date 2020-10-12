package com.sprachwelt;

import com.sprachwelt.facade.TextRepositoryFacade;
import com.sprachwelt.repository.TextRepository;
import com.sprachwelt.repository.WordRepository;
import com.sprachwelt.service.TextService;
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
    private TextRepositoryFacade textRepositoryFacade;

    @Autowired
    private WordRepository wordRepository;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    public ModelMapper getModelMapper() {
        return new ModelMapper();
    }

    @Override
    public void run(String... args) throws Exception {

//        textRepository.deleteAll();
//        Text text = textService.tokenize("A fost odata ca in povest, a fost ca niciodata. Odata, odata, poate.");
//
//        text = textRepositoryFacade.save(text);
//
//        Map<String, Set<Integer>> map = textRepositoryFacade.getWord2PositionMappings(text.getId());
//
//        System.out.println("map " + map);

//        textRepository.deleteAll();
    }
}
