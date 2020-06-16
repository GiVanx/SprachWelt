package com.sprachwelt.service;

import com.sprachwelt.model.Text;
import com.sprachwelt.model.TextWithGaps;
import com.sprachwelt.model.Word;
import com.sprachwelt.repository.TextRepository;
import com.sprachwelt.view.WordView;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TextWithGapsService {

    @Autowired
    private TextRepository textRepository;

    @Autowired
    private ModelMapper modelMapper;

    /**
     * @param text
     * @param wordPresenceProbabilityPercent
     * @return
     */
    public TextWithGaps create(Text text, int wordPresenceProbabilityPercent) {

        List<WordView> textWithGaps = new ArrayList<>();
        Set<WordView> missingWords = new HashSet<>();
        Random random = new Random();

        int i = 0;
        for (Word word : text.getWords()) {

            WordView wordView = modelMapper.map(word, WordView.class);

            // check if this is a word
            if (word.getContent().matches("^[a-zA-Z0-9\\-äöüÄÖÜß]*$")
                    && random.nextInt(100) < wordPresenceProbabilityPercent) {

                missingWords.add(wordView);
                textWithGaps.add(null);
            } else {
                textWithGaps.add(wordView);
            }
            ++i;
        }
        return new TextWithGaps(text.getId(), missingWords, textWithGaps);
    }
}
