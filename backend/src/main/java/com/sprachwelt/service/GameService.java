package com.sprachwelt.service;

import com.sprachwelt.model.*;
import com.sprachwelt.repository.GameRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GameService {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private ModelMapper modelMapper;

    /**
     * @param text
     * @param level an integer number from 1 to 10.
     * @return
     */
    public Game create(Text text, int level) {

        List<Word> textWithGaps = new ArrayList<>();
        Set<Word> missingWords = new HashSet<>();
        Random random = new Random();

        int wordPresenceProbability = (level + 3) * 10;

        int i = 0;
        for (Word word : text.getWords()) {

            // check if this is a word
            if (word.getContent().matches("^[a-zA-Z0-9\\-äöüÄÖÜß]*$")
                    && random.nextInt(100) < wordPresenceProbability) {

                missingWords.add(word);
            } else {
                word.setStatus(WordStatus.ORIGINAL);
                textWithGaps.add(word);
            }
            ++i;
        }

        return Game.builder().text(text).missingWords(missingWords).textWithGaps(textWithGaps).build();
    }
}
