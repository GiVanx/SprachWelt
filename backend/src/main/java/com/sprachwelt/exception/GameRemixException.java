package com.sprachwelt.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class GameRemixException extends RuntimeException {

    public GameRemixException() {
        super("Game already started. Cannot remix at this point.");
    }
}
