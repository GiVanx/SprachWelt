package com.sprachwelt;

import com.sprachwelt.model.Text;
import com.sprachwelt.model.Word;
import com.sprachwelt.repository.TextRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Arrays;

@SpringBootApplication
public class Application implements CommandLineRunner {

    @Autowired
    private TextRepository textRepository;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }


    @Override
    public void run(String... args) throws Exception {
//        textRepository.deleteAll();

        textRepository.findAll().forEach(text -> System.out.println(text));

//        Word word = new Word("Hello", 0);
//        Word word1 = new Word("World", 1);
//
//        Text text = new Text(Arrays.asList(word, word1));
//
//        text = textRepository.save(text);
//        text = textRepository.findById(text.getId()).get();
//
//        System.out.println(text);

//        textRepository.deleteAll();
    }
}
