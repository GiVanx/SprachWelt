package com.sprachwelt.model;

import java.util.List;

public class TextWithGaps {

    private String textId;

    private List<Word> missingWords;

    private List<String> textWithGaps;

    public TextWithGaps(String textId, List<Word> missingWords, List<String> textWithGaps) {
        this.missingWords = missingWords;
        this.textWithGaps = textWithGaps;
        this.textId = textId;
    }

    public String getTextId() {
        return textId;
    }

    public List<Word> getMissingWords() {
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
