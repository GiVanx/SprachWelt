package com.sprachwelt.auth.exception;

import com.sprachwelt.auth.model.User;

public class UserNotRegisteredException extends RuntimeException {

    public UserNotRegisteredException(User user) {
        super("You don't have a registered account. Please register first.");
    }
}
