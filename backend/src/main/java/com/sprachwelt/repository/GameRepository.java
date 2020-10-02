package com.sprachwelt.repository;

import com.sprachwelt.model.Game;
import com.sprachwelt.model.Text;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {

//    Word findByTextIdAndWordId(String textId, ObjectId wordId);
//
//    Text findByIdd(String textId);
//
//    List<Word> findByIdAndWordsId(String textId, String wordIds);
}
