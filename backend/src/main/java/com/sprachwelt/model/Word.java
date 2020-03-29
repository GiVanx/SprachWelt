package com.sprachwelt.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("words")
public class Word {

    @Id
    private String id;
    private String word;
    private Integer position;

    public Word() {
    }

    public Word(String id, String word, Integer position) {
        this.id = id;
        this.word = word;
        this.position = position;
    }

    public String getId() {
        return id;
    }

    public String getWord() {
        return word;
    }

    public Integer getPosition() {
        return position;
    }

    @Override
    public String toString() {
        return "Word{" +
                "id=" + id + ", " +
                "text='" + word + '\'' +
                ", position=" + position +
                '}';
    }
}
