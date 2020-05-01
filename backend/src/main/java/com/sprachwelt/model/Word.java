package com.sprachwelt.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("words")
public class Word {

    @Id
    private String id;
    private String text;
    private Integer position;

    public Word() {
    }

    public Word(String id, String text, Integer position) {
        this.id = id;
        this.text = text;
        this.position = position;
    }

    public String getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public Integer getPosition() {
        return position;
    }

    @Override
    public String toString() {
        return "Word{" +
                "id=" + id + ", " +
                "text='" + text + '\'' +
                ", position=" + position +
                '}';
    }
}
