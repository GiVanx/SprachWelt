package com.sprachwelt.service;

import com.sprachwelt.model.Text;
import com.sprachwelt.model.TextWithGaps;
import com.sprachwelt.model.Word;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class TextWithGapsService {

    public TextWithGaps create(Text text, int wordPresenceProbabilityPercent) {

        List<String> textWithGaps = new ArrayList<>();
        List<Word> missingWords = new ArrayList<>();
        Random random = new Random();

        for (Word word : text.getWords()) {

            // check if this is a word
            if (word.getText().matches("^[a-zA-Z0-9\\-äöüÄÖÜß]*$")
                    && random.nextInt(100) > wordPresenceProbabilityPercent) {

                missingWords.add(word);
                textWithGaps.add(null);
            } else {
                textWithGaps.add(word.getText());
            }
        }
        return new TextWithGaps(missingWords, textWithGaps);
    }
}
