package com.sprachwelt.service;

import com.sprachwelt.exception.TextNotFound;
import com.sprachwelt.model.Text;
import com.sprachwelt.model.Word;
import com.sprachwelt.repository.TextRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class TextService {

    @Autowired
    private TextRepository textRepository;

    public Text add(String textString) {

        List<Word> textWords = getWords(textString);
        Text text = new Text(textWords);

        return textRepository.save(text);
    }

    public boolean checkWord(String textId, Word word) {

        Text text = textRepository.findById(textId).orElseThrow(() -> new TextNotFound(textId));

        Word originalWord = textRepository.findByTextIdAndWordId(text.getId(), word.getId());
        return word.getPosition() == originalWord.getPosition();
    }

    private List<Word> getWords(String text) {

        List<Word> words = new ArrayList<>();
        String pattern = "[a-zA-Z0-9\\-äöüÄÖÜß]";
        String[] parts = text.split(pattern);

        StringBuffer currentWord = new StringBuffer();
        int wordPosition = 0;
        Word word;
        for (char c : text.toCharArray()) {

            if (Character.toString(c).matches(pattern)) {
                currentWord.append(c);
            } else {
                if (currentWord.length() != 0) {
                    word = new Word(currentWord.toString(), wordPosition++);
                    words.add(word);
                    currentWord = new StringBuffer();
                }

                if (c != 32) {
                    System.out.println("-" + (int) c + "-" + wordPosition);
                    word = new Word(Character.toString(c), wordPosition++);
                    words.add(word);
                }
            }
        }

        if (currentWord.length() != 0) {
            word = new Word(currentWord.toString(), wordPosition);
            words.add(word);
        }

        return words;
    }

}
