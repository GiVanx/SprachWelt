package com.sprachwelt.service;

import com.sprachwelt.model.Text;
import com.sprachwelt.model.Word;
import com.sprachwelt.model.WordStatus;
import com.sprachwelt.facade.TextRepositoryFacade;
import com.sprachwelt.view.WordView;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class TextService {

    @Autowired
    private TextRepositoryFacade textRepositoryFacade;

    @Autowired
    private ModelMapper modelMapper;

    public Text tokenize(String text) {
        List<Word> textWords = getTextWords(text);
        return Text.builder().words(textWords).build();
    }

    /**
     * @param textId
     * @param words
     * @returns
     */
    public List<WordView> checkWords(Long textId, List<WordView> words) {

        Map<String, Set<Integer>> mappings = textRepositoryFacade.getWord2PositionMappings(textId);
        List<WordView> wordStatusList = new ArrayList<>();

        for (WordView wordToCheck : words) {

            WordStatus status = WordStatus.NOT_FOUND;
            if (mappings.containsKey(wordToCheck.getContent())) {

                if (mappings.get(wordToCheck.getContent()).contains(wordToCheck.getPosition())) {
                    status = WordStatus.OK;
                } else {
                    status = WordStatus.WRONG;
                }
            }

            WordView wordStatusView = modelMapper.map(wordToCheck, WordView.class);
            wordStatusView.setStatus(status);
            wordStatusList.add(wordStatusView);
        }
        return wordStatusList;
    }

    private List<Word> getTextWords(String text) {

        List<Word> words = new ArrayList<>();
        String pattern = "[a-zA-Z0-9\\-äöüÄÖÜß]";

        StringBuffer currentWord = new StringBuffer();
        int wordPosition = 0;
        Word word;
        for (char c : text.toCharArray()) {

            if (Character.toString(c).matches(pattern)) {
                currentWord.append(c);
            } else {
                if (currentWord.length() != 0) {
                    word = Word.builder().content(currentWord.toString()).position(wordPosition++).build();
                    words.add(word);
                    currentWord = new StringBuffer();
                }

                if (c != 32) {
                    System.out.println("-" + (int) c + "-" + wordPosition);
                    word = Word.builder().content(Character.toString(c)).position(wordPosition++).build();
                    words.add(word);
                }
            }
        }

        if (currentWord.length() != 0) {
            word = Word.builder().content(currentWord.toString()).position(wordPosition++).build();
            words.add(word);
        }
        return words;
    }
}
