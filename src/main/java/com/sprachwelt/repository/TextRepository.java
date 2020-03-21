package com.sprachwelt.repository;

import com.sprachwelt.model.Text;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TextRepository extends MongoRepository<Text, String> {
}
