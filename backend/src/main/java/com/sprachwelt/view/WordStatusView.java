package com.sprachwelt.view;

import com.sprachwelt.model.WordStatus;

public class WordStatusView {

    private String id;
    private String text;
    private WordStatus status;
    private Integer position;

    public WordStatusView(String id, String text, WordStatus wordStatus, Integer position) {
        this.id = id;
        this.text = text;
        this.status = wordStatus;
        this.position = position;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public WordStatus getStatus() {
        return status;
    }

    public void setStatus(WordStatus status) {
        this.status = status;
    }

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }
}
