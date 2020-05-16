package com.sprachwelt.service;

import com.sprachwelt.model.Text;
import com.sprachwelt.model.Word;
import com.sprachwelt.model.WordStatus;
import com.sprachwelt.repository.TextRepository;
import com.sprachwelt.view.WordStatusView;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@Service
public class TextService {

    @Autowired
    private TextRepository textRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Text add(String textString) {

        List<Word> textWords = getTextWords(textString);
        Text text = new Text(textWords);

        return textRepository.save(text);
    }

    /**
     * db.text.aggregate([
     * { $match: { _id: ObjectId("5e774e316a023c50b8569ce5")}},
     * { $project: { words: {$filter: {input:"$words", as: "word", cond: {$in: ["$$word._id",  [ ObjectId("5e774e316a023c50b8569cdc"), ObjectId("5e774e316a023c50b8569ce4")]] } } } }}
     * ])
     *
     * @param textId
     * @param words
     * @returns
     */
    public List<WordStatusView> checkWords(String textId, List<Word> words) {

        Text text = getTextWords(textId, words.stream().map(Word::getText).collect(Collectors.toList()));

        System.out.println("text" + text);

        Map<String, Map<Integer, Word>> wordMap = text.getWords()
                .stream().collect(Collectors.groupingBy(Word::getText,
                        Collectors.mapping(word -> word, Collectors.toMap(Word::getPosition, word -> word))));

        List<WordStatusView> statusList = new ArrayList<>();

        System.out.println();

        for (Word wordToCheck : words) {

            WordStatus status = WordStatus.NOT_FOUND;
            if (wordMap.containsKey(wordToCheck.getText())) {

                if (wordMap.get(wordToCheck.getText()).containsKey(wordToCheck.getPosition())) {
                    status = WordStatus.OK;
                } else {
                    status = WordStatus.WRONG;
                }
            }
            statusList.add(new WordStatusView(wordToCheck.getId(), wordToCheck.getText(), status, wordToCheck.getPosition()));

        }
        return statusList;
    }

    private Text getTextWords(String textId, List<String> words) {
        MatchOperation matchOperation = match(Criteria.where("_id").is(new ObjectId(textId)));
        ProjectionOperation projectionOperation =
                project().and((AggregationOperationContext context) -> {
                    Document filterExpression = new Document();
                    filterExpression.put("input", "$words");
                    filterExpression.put("as", "word");
                    filterExpression.put("cond", new Document("$in",
                            Arrays.<Object>asList("$$word.text", words)));
                    return new Document("$filter", filterExpression);
                }).as("words");

        Aggregation aggregation = newAggregation(matchOperation, projectionOperation);
        AggregationResults<Text> result = mongoTemplate.aggregate(aggregation, "text", Text.class);
        return result.getUniqueMappedResult();
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
                    word = new Word(new ObjectId().toString(), currentWord.toString(), wordPosition++);
                    words.add(word);
                    currentWord = new StringBuffer();
                }

                if (c != 32) {
                    System.out.println("-" + (int) c + "-" + wordPosition);
                    word = new Word(new ObjectId().toString(), Character.toString(c), wordPosition++);
                    words.add(word);
                }
            }
        }

        if (currentWord.length() != 0) {
            word = new Word(new ObjectId().toString(), currentWord.toString(), wordPosition);
            words.add(word);
        }

        return words;
    }

}
