package com.sprachwelt.service;

import com.sprachwelt.exception.TextNotFound;
import com.sprachwelt.model.Text;
import com.sprachwelt.model.TextWithGaps;
import com.sprachwelt.model.Word;
import com.sprachwelt.model.WordGroup;
import com.sprachwelt.repository.TextRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@Service
public class TextWithGapsService {

    @Autowired
    private TextRepository textRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * db.text.aggregate([ { $match: { _id: ObjectId("5e7732d8ff33e54747fe1ed4")}}, { $unwind: "$words" }, { $group: { _id:"$words.word", wordIds: { $push: "$words._id" } } }  ])
     * @param text
     * @param wordPresenceProbabilityPercent
     * @return
     */
    public TextWithGaps create(Text text, int wordPresenceProbabilityPercent) {

        String textId = text.getId();
        text = textRepository.findById(new ObjectId(text.getId())).orElseThrow(() -> new TextNotFound(textId));

        Map<String, WordGroup> wordGroups = getWordGroups(text);

        List<String> textWithGaps = new ArrayList<>();
        Set<WordGroup> missingWords = new HashSet<>();
        Random random = new Random();

        for (Word word : text.getWords()) {

            // check if this is a word
            if (word.getWord().matches("^[a-zA-Z0-9\\-äöüÄÖÜß]*$")
                    && random.nextInt(100) > wordPresenceProbabilityPercent) {

                missingWords.add(wordGroups.get(word.getWord()));
                textWithGaps.add(null);
            } else {
                textWithGaps.add(word.getWord());
            }
        }
        return new TextWithGaps(text.getId(), missingWords, textWithGaps);
    }

    private Map<String, WordGroup> getWordGroups(Text text) {
        MatchOperation matchOperation = match(Criteria.where("_id").is(new ObjectId(text.getId())));
        UnwindOperation unwindOperation = unwind("words");
        GroupOperation groupOperation = group("words.word").push("words._id").as("wordIds");

        Aggregation aggregation= newAggregation(matchOperation, unwindOperation, groupOperation);
        AggregationResults<WordGroup> result = mongoTemplate.aggregate(aggregation, "text", WordGroup.class);

        return result.getMappedResults().stream().collect(Collectors.toMap(wordGroup -> wordGroup.getId(), wordGroup -> wordGroup));
    }
}
