package com.sprachwelt.facade;

import com.sprachwelt.auth.model.User;
import com.sprachwelt.auth.repository.UserRepository;
import com.sprachwelt.model.Game;
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

    public User removeGame(Game game) {
        User activeUser = getActiveUser();
        if (hasGame(game)) {
            activeUser.setGame(null);
            return save(activeUser);
        }
        return activeUser;
    }

    public boolean hasGame(Game game) {
        Game activeGame = getActiveUser().getGame();
        if (activeGame != null) {
            return activeGame.getId() == game.getId();
        }
        return false;
    }

    public User save(User user) {
        return this.userRepository.save(user);
    }
}
