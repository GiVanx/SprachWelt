package com.sprachwelt.service;

import com.sprachwelt.auth.model.User;
import com.sprachwelt.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class UserFacade {

    @Autowired
    private UserRepository userRepository;

    public User getActiveUser() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return this.userRepository.getOne(user.getId());
    }

    public User save(User user) {
        return this.userRepository.save(user);
    }
}
