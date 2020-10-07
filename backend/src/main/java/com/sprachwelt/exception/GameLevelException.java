package com.sprachwelt.exception;

import com.sprachwelt.utils.Constants;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class GameLevelException extends RuntimeException {

    public GameLevelException() {
        super("Game level can only be between '" + Constants.GAME_MIN_LEVEL + "' and '" + Constants.GAME_MAX_LEVEL + "'.");
    }
}
