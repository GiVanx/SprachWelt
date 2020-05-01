package com.sprachwelt;

import com.sprachwelt.model.Text;
import com.sprachwelt.repository.TextRepository;
import com.sprachwelt.service.TextService;
import com.sprachwelt.service.TextWithGapsService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;

import java.util.List;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;
import static org.springframework.data.mongodb.core.aggregation.Aggregation.unwind;

@SpringBootApplication
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

    @Override
    public void run(String... args) throws Exception {

        textRepository.deleteAll();

        textService.add("You never know how things will turn out to be");

        System.out.println(textRepository.findAll());
    }
}
