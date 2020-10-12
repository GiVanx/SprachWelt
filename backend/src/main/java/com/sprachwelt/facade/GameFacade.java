package com.sprachwelt.facade;

import com.sprachwelt.auth.model.User;
import com.sprachwelt.exception.GameLevelException;
import com.sprachwelt.exception.GameNotFoundException;
import com.sprachwelt.exception.GameRemixException;
import com.sprachwelt.model.Game;
import com.sprachwelt.model.GameStatus;
import com.sprachwelt.model.Text;
import com.sprachwelt.repository.GameRepository;
import com.sprachwelt.service.GameService;
import com.sprachwelt.utils.Constants;
import com.sprachwelt.view.WordView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class GameFacade {

    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private UserFacade userFacade;

    @Autowired
    private GameService gameService;

    @Autowired
    private TextFacade textFacade;

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

    public Game save(Game game) {
        Game toBeUpdated = getGame(game.getId());
        toBeUpdated.setTextWithGaps(game.getTextWithGaps());
        toBeUpdated.setMissingWords(game.getMissingWords());
        return this.gameRepository.save(toBeUpdated);
    }

    public List<WordView> check(long gameId, List<WordView> wordsToCheck) {
        Game game = getGame(gameId);
        return textFacade.checkWords(game.getText().getId(), wordsToCheck);
    }

    public void cancel(long gameId) {
        Game game = getGame(gameId);
        userFacade.removeGame(game);
        gameRepository.delete(game);
    }

    private Game getGame(long id) {
        Game game = gameRepository.getOne(id);
        if (game == null || !userFacade.hasGame(game)) {
            throw new GameNotFoundException(id);
        }
        return game;
    }
}
