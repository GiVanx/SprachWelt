package com.sprachwelt.model;

import java.util.List;
import java.util.Set;

public class TextWithGaps {

    private String textId;

    private Set<WordIdsGroupedByWord> missingWords;

    private List<String> textWithGaps;

    public TextWithGaps(String textId, Set<WordIdsGroupedByWord> missingWords, List<String> textWithGaps) {
        this.missingWords = missingWords;
        this.textWithGaps = textWithGaps;
        this.textId = textId;
    }

    public String getTextId() {
        return textId;
    }

    public Set<WordIdsGroupedByWord> getMissingWords() {
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
