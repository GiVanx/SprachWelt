package com.sprachwelt.exception;

import com.sprachwelt.utils.Constants;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.BAD_REQUEST)
public class GameAlreadyExistsException extends RuntimeException {

    public GameAlreadyExistsException() {
        super("User already has one created game");
    }
}
