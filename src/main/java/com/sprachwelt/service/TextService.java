package com.sprachwelt.service;

import com.sprachwelt.exception.TextNotFound;
import com.sprachwelt.model.Text;
import com.sprachwelt.model.Word;
import com.sprachwelt.repository.TextRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class TextService {

    @Autowired
    private TextRepository textRepository;

    public Text add(String textString) {

        List<Word> textWords = getWords(textString);
        Text text = new Text(textWords);

        return textRepository.save(text);
    }

    public boolean checkWord(Text text, Word word) {

        String id = text.getId();
        text = textRepository.findById(text.getId()).orElseThrow(() -> new TextNotFound(id));

        Word originalWord = textRepository.findByTextIdAndWordId(text.getId(), word.getId());
        return word.getPosition() == originalWord.getPosition();
    }

    private List<Word> getWords(String text) {

        String pattern = "[^a-zA-Z0-9]";
        String[] parts = text.split(pattern);

        return IntStream.range(0, parts.length)
                .mapToObj(index -> new Word(parts[index], index))
                .collect(Collectors.toList());
    }

}
