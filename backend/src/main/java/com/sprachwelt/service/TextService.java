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

        Map<String, List<Word>> wordMap = words
                .stream().collect(Collectors.groupingBy(Word::getText,
                        Collectors.mapping(word -> word, Collectors.toList())));

        Text text = getTextWords(textId, Arrays.asList(wordMap.keySet().toArray(new String[wordMap.keySet().size()])));

        List<WordStatusView> statusList = new ArrayList<>();

        for (String textWord : wordMap.keySet()) {

            List<Word> inputWords = wordMap.get(textWord);

            

            Word wordFromText = wordMap.get(word.getText());
            WordStatus status;

            if (wordFromText == null) {
                status = WordStatus.NOT_FOUND;
            } else if (wordFromText.getPosition() != word.getPosition()) {
                status = WordStatus.WRONG_POSITION;
            } else {
                status = WordStatus.OK;
            }

            statusList.add(new WordStatusView(word.getId(), status));
        }
        return statusList;
    }

    private Text getTextWords(String textId, String word) {
        MatchOperation matchOperation = match(Criteria.where("_id").is(new ObjectId(textId)));
        ProjectionOperation projectionOperation =
                project().and((AggregationOperationContext context) -> {
                    Document filterExpression = new Document();
                    filterExpression.put("input", "$words");
                    filterExpression.put("as", "word");
                    filterExpression.put("cond", new Document("$in",
                            Arrays.<Object>asList("$$word._id", word)));
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
