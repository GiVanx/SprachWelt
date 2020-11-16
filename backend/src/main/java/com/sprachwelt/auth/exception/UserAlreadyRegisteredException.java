package com.sprachwelt.auth.exception;

import com.sprachwelt.auth.model.User;

public class UserAlreadyRegisteredException extends RuntimeException {

    public UserAlreadyRegisteredException(User user) {
        super("You are already registered. Please login.");
    }
}
