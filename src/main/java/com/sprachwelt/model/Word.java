package com.sprachwelt.model;

import org.springframework.data.annotation.Id;

public class Word {

    @Id
    private String id;
    private String text;
    private Integer position;

    public Word(String text, Integer position) {
        this.text = text;
        this.position = position;
    }

    @Override
    public String toString() {
        return "Word{" +
                "text='" + text + '\'' +
                ", position=" + position +
                '}';
    }
}
