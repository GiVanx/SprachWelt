package com.sprachwelt.repository;

import com.sprachwelt.model.Text;
import com.sprachwelt.model.Word;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TextRepository extends MongoRepository<Text, ObjectId> {

    @Query(value="{'id': ?0, 'words.id':?1}")
    Word findByTextIdAndWordId(String textId, ObjectId wordId);

    @Query(value="{'id': ?0}", fields = "{position: 0}")
    Optional<List<Word>> findWordsByTextIdExcludePosition(String textId);
}
