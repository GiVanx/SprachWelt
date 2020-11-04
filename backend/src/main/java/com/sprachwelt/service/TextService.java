package com.sprachwelt.service;

import com.sprachwelt.model.Text;
import com.sprachwelt.model.Word;
import com.sprachwelt.model.WordStatus;
import com.sprachwelt.facade.TextRepositoryFacade;
import com.sprachwelt.model.WordType;
import com.sprachwelt.view.WordView;
import opennlp.tools.tokenize.SimpleTokenizer;
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

        List<Word> textWords = new ArrayList<>();
        SimpleTokenizer tokenizer = SimpleTokenizer.INSTANCE;

        String words[] = tokenizer.tokenize(text);

        for (int i = 0; i < words.length; ++i) {
            Word word = Word.builder().content(words[i]).position(i).type(getType(words[i])).build();
            textWords.add(word);
        }
        return textWords;
    }

    private WordType getType(String word) {
        if (word.length() == 1 && !Character.isLetter(word.charAt(0))) {
            return WordType.SPECIAL;
        }
        return WordType.WORD;
    }
}
