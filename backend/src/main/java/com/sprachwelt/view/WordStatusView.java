package com.sprachwelt.view;

import com.sprachwelt.model.WordStatus;

public class WordStatusView {

    private String wordId;
    private WordStatus status;

    public WordStatusView(String wordId, WordStatus wordStatus) {
        this.wordId = wordId;
        this.status = wordStatus;
    }

    public String getWordId() {
        return wordId;
    }

    public void setWordId(String wordId) {
        this.wordId = wordId;
    }

    public WordStatus getStatus() {
        return status;
    }

    public void setStatus(WordStatus status) {
        this.status = status;
    }
}
