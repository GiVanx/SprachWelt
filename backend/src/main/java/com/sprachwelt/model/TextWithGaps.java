package com.sprachwelt.model;

import com.sprachwelt.view.WordView;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
public class TextWithGaps {

    private Long textId;

    private Set<WordView> missingWords;

    private List<WordView> textWithGaps;
}
