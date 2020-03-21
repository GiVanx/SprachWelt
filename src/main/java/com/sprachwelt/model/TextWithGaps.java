package com.sprachwelt.model;

import java.util.List;

public class TextWithGaps {

    List<Word> missingWords;

    List<String> textWithGaps;

    public TextWithGaps(List<Word> missingWords, List<String> textWithGaps) {
        this.missingWords = missingWords;
        this.textWithGaps = textWithGaps;
    }

    @Override
    public String toString() {
        return "TextWithGaps{" +
                "missingWords=" + missingWords +
                ", textWithGaps=" + textWithGaps +
                '}';
    }
}
