package com.sprachwelt.view;

import com.sprachwelt.model.GameStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class GameStatusView {

    private Long id;
    private GameStatus status;
}
