package com.sprachwelt.model;

import org.bson.types.ObjectId;

import java.util.List;
import java.util.Set;

public class TextWithGaps {

    private String textId;

    private Set<WordGroup> missingWords;

    private List<String> textWithGaps;

    public TextWithGaps(String textId, Set<WordGroup> missingWords, List<String> textWithGaps) {
        this.missingWords = missingWords;
        this.textWithGaps = textWithGaps;
        this.textId = textId;
    }

    public String getTextId() {
        return textId;
    }

    public Set<WordGroup> getMissingWords() {
        return missingWords;
    }

    public List<String> getTextWithGaps() {
        return textWithGaps;
    }

    @Override
    public String toString() {
        return "TextWithGaps{" +
                "missingWords=" + missingWords +
                ", textWithGaps=" + textWithGaps +
                '}';
    }
}
