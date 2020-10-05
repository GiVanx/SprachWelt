package com.sprachwelt.repository;

import com.sprachwelt.auth.model.User;
import com.sprachwelt.exception.GameLevelException;
import com.sprachwelt.exception.GameNotFoundException;
import com.sprachwelt.exception.GameRemixException;
import com.sprachwelt.model.Game;
import com.sprachwelt.model.GameStatus;
import com.sprachwelt.model.Text;
import com.sprachwelt.service.GameService;
import com.sprachwelt.service.UserFacade;
import com.sprachwelt.utils.Constants;
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
        game.setStatus(GameStatus.NOT_STARTED);
        return gameRepository.save(game);
    }

    public Game start(Long id) {
        Game game = getGame(id);
        if (game != null) {
            game.setStatus(GameStatus.STARTED);
            game = gameRepository.save(game);
        }
        return game;
    }

    public Game remix(Long id, int level) {
        if (level < Constants.GAME_MIN_LEVEL || level > Constants.GAME_MAX_LEVEL) {
            throw new GameLevelException();
        }
        Game game = getGame(id);

        if (game.getStatus() == GameStatus.STARTED) {
            throw new GameRemixException();
        }

        Game remixed = gameService.create(game.getText(), level);
        game.setMissingWords(remixed.getMissingWords());
        game.setTextWithGaps(remixed.getTextWithGaps());
        return gameRepository.save(game);
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
