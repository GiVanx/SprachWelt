package com.sprachwelt.view;

import com.sprachwelt.model.GameStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Collections;
import java.util.List;

@Getter
@Setter
@ToString
public class GameView {

    private Long id;
    private GameStatus status;
    private List<MissingWordView> missingWords;
    private List<WordView> textWithGaps;

    public List<MissingWordView> getMissingWords() {
        Collections.shuffle(missingWords);
        return missingWords;
    }
}
