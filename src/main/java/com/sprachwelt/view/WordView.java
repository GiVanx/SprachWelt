package com.sprachwelt.view;

import com.sprachwelt.model.WordIdsGroupedByWord;

public class WordView {
    private String textId;
    private int position;
    private WordIdsGroupedByWord wordIdsGroupedByWord;

    public String getTextId() {
        return textId;
    }

    public void setTextId(String textId) {
        this.textId = textId;
    }

    public int getPosition() {
        return position;
    }

    public void setPosition(int position) {
        this.position = position;
    }

    public WordIdsGroupedByWord getWordIdsGroupedByWord() {
        return wordIdsGroupedByWord;
    }

    public void setWordIdsGroupedByWord(WordIdsGroupedByWord wordIdsGroupedByWord) {
        this.wordIdsGroupedByWord = wordIdsGroupedByWord;
    }
}
