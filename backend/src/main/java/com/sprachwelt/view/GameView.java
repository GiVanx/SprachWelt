package com.sprachwelt.view;

import com.sprachwelt.model.GameStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
public class GameView {

    private Long id;
    private GameStatus status;
    private Set<MissingWordView> missingWords;
    private List<WordView> textWithGaps;
}
