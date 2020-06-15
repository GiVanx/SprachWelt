package com.sprachwelt.repository;

import com.sprachwelt.model.Word;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordRepository extends JpaRepository<Word, String> {

}
