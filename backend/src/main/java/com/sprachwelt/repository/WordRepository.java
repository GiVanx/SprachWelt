package com.sprachwelt.repository;

import com.sprachwelt.model.Word;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface WordRepository extends MongoRepository<Word, String> {

}
