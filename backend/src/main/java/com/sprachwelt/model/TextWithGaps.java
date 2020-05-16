package com.sprachwelt.model;

import com.sprachwelt.view.WordView;

import java.util.List;
import java.util.Set;

public class TextWithGaps {

    private String textId;

    private Set<WordView> missingWords;

    private List<WordView> textWithGaps;

    public TextWithGaps(String textId, Set<WordView> missingWords, List<WordView> textWithGaps) {
        this.missingWords = missingWords;
        this.textWithGaps = textWithGaps;
        this.textId = textId;
    }

    public String getTextId() {
        return textId;
    }

    public Set<WordView> getMissingWords() {
        return missingWords;
    }

    public List<WordView> getTextWithGaps() {
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
