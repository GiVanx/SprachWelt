package com.sprachwelt.repository;

import com.sprachwelt.auth.model.User;
import com.sprachwelt.exception.GameNotFoundException;
import com.sprachwelt.model.Game;
import com.sprachwelt.model.GameStatus;
import com.sprachwelt.model.Text;
import com.sprachwelt.service.GameService;
import com.sprachwelt.service.UserFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GameFacade {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private UserFacade userFacade;

    @Autowired
    private GameService gameService;

    public Game create(Text text, int wordPresenceProbabilityPercent) {
        Game game = gameService.create(text, wordPresenceProbabilityPercent);
        return gameRepository.save(game);
    }

    public Game start(Long id) {
        Game game = getGame(id);
        if (game != null) {
            game.setStatus(GameStatus.STARTED);
        }
        return game;
    }

    private Game getGame(Long id) {
        Game game = gameRepository.getOne(id);
        User activeUser = userFacade.getActiveUser();
        if (game == null || activeUser.getGame().getId() != game.getId()) {
            throw new GameNotFoundException(id);
        }
        return game;
    }
}
