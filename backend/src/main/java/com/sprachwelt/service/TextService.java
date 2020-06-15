package com.sprachwelt.service;

import com.sprachwelt.model.Text;
import com.sprachwelt.model.Word;
import com.sprachwelt.model.WordStatus;
import com.sprachwelt.repository.TextRepository;
import com.sprachwelt.view.WordStatusView;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TextService {

    @Autowired
    private TextRepository textRepository;

    @Autowired
    private ModelMapper modelMapper;

    public Text add(String textString) {

        List<Word> textWords = getTextWords(textString);
        Text text =  Text.builder().words(textWords).build();
        //TODO: re-implement
        return null;
    }

    /**
     *
     * @param textId
     * @param words
     * @returns
     */
    public List<WordStatusView> checkWords(String textId, List<Word> words) {

        Text text = getTextWords(textId, words.stream().map(Word::getContent).collect(Collectors.toList()));

        Map<String, Map<Integer, Word>> wordMap = text.getWords()
                .stream().collect(Collectors.groupingBy(Word::getContent,
                        Collectors.mapping(word -> word, Collectors.toMap(Word::getPosition, word -> word))));

        List<WordStatusView> statusList = new ArrayList<>();

        System.out.println();

        for (Word wordToCheck : words) {

            WordStatus status = WordStatus.NOT_FOUND;
            if (wordMap.containsKey(wordToCheck.getContent())) {

                if (wordMap.get(wordToCheck.getContent()).containsKey(wordToCheck.getPosition())) {
                    status = WordStatus.OK;
                } else {
                    status = WordStatus.WRONG;
                }
            }

            WordStatusView wordStatusView = modelMapper.map(wordToCheck, WordStatusView.class);
            wordStatusView.setStatus(status);
            statusList.add(wordStatusView);
        }
        return statusList;
    }

    private Text getTextWords(String textId, List<String> words) {

        //TODO: re-implement
        return null;
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
                    word = Word.builder().content(currentWord.toString()).position(wordPosition++).build();;
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
