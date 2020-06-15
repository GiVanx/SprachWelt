package com.sprachwelt.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class TextNotFound extends RuntimeException {

    public TextNotFound(String id) {
        super("Text#" + id + " not found");
    }
}
