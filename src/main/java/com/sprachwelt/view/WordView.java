package com.sprachwelt.view;

import com.sprachwelt.model.Word;
import org.bson.types.ObjectId;

public class WordView {
    private ObjectId textId;
    private Word word;

    public ObjectId getTextId() {
        return textId;
    }

    public void setTextId(ObjectId textId) {
        this.textId = textId;
    }

    public Word getWord() {
        return word;
    }

    public void setWord(Word word) {
        this.word = word;
    }
}
