package com.sprachwelt.repository;

import com.sprachwelt.model.Text;
import com.sprachwelt.model.Word;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface TextRepository extends MongoRepository<Text, String> {

    @Query(value="{'id': ?0, 'words.id':?1}")
    Word findByTextIdAndWordId(String textId, String wordId);
}
