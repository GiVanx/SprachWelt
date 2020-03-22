package com.sprachwelt.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;

import java.util.List;
import java.util.stream.Collectors;


public class Text {
    @Id
    private String id;

    private List<Word> words;

    public Text(List<Word> words) {
        this.words = words;
    }

    public String getId() {
        return id;
    }

    public List<Word> getWords() {
        return words;
    }

    @Override
    public String toString() {
        return "Text{id:"+ id + "[" + words.stream().map(word -> word.toString()).collect(Collectors.joining(",")) + "]}";
    }
}
