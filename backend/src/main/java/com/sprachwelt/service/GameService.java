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
     * @param level an integer number from 1 to 5.
     * @return
     */
    public Game create(Text text, int level) {

        LinkedHashSet<Word> textWithGaps = new LinkedHashSet<>();
        LinkedHashSet<Word> missingWords = new LinkedHashSet<>();
        Random random = new Random();

        int wordPresenceProbability = (5 + level) * 10;

        for (Word word : text.getWords()) {

            // check if this is a word
            if (word.getType() == WordType.WORD
                    && random.nextInt(100) < wordPresenceProbability) {

                word.setStatus(WordStatus.IDLE);
                missingWords.add(word);
            } else {
                word.setStatus(WordStatus.ORIGINAL);
                textWithGaps.add(word);
            }
        }

        return Game.builder().text(text).missingWords(missingWords).textWithGaps(textWithGaps).build();
    }
}
