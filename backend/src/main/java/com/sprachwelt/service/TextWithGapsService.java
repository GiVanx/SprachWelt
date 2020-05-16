package com.sprachwelt.service;

import com.sprachwelt.exception.TextNotFound;
import com.sprachwelt.model.Text;
import com.sprachwelt.model.TextWithGaps;
import com.sprachwelt.model.Word;
import com.sprachwelt.model.WordIdsGroupedByWord;
import com.sprachwelt.repository.TextRepository;
import com.sprachwelt.view.WordView;
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
        text = textRepository.findById(text.getId()).orElseThrow(() -> new TextNotFound(textId));

        List<WordView> textWithGaps = new ArrayList<>();
        Set<WordView> missingWords = new HashSet<>();
        Random random = new Random();

        int i = 0;
        for (Word word : text.getWords()) {

            // check if this is a word
            if (word.getText().matches("^[a-zA-Z0-9\\-äöüÄÖÜß]*$")
                    && random.nextInt(100) < wordPresenceProbabilityPercent) {

                missingWords.add(new WordView(word.getId(), word.getText()));
                textWithGaps.add(null);
            } else {
                textWithGaps.add(new WordView(word.getId(), word.getText()));
            }
            ++i;
        }
        return new TextWithGaps(text.getId(), missingWords, textWithGaps);
    }

    private Map<String, WordIdsGroupedByWord> getWordGroups(Text text) {

        MatchOperation matchOperation = match(Criteria.where("_id").is(new ObjectId(text.getId())));
        UnwindOperation unwindOperation = unwind("words");
        GroupOperation groupOperation = group("words.word").push("words._id").as("wordIds");

        Aggregation aggregation= newAggregation(matchOperation, unwindOperation, groupOperation);
        AggregationResults<WordIdsGroupedByWord> result = mongoTemplate.aggregate(aggregation, "text", WordIdsGroupedByWord.class);

        return result.getMappedResults().stream().collect(Collectors.toMap(wordIdsGroupedByWord -> wordIdsGroupedByWord.getId(), wordIdsGroupedByWord -> wordIdsGroupedByWord));
    }
}
