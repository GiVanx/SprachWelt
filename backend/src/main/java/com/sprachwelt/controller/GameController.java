package com.sprachwelt.controller;

import com.sprachwelt.auth.model.User;
import com.sprachwelt.exception.GameAlreadyExistsException;
import com.sprachwelt.model.Game;
import com.sprachwelt.model.Text;
import com.sprachwelt.facade.GameFacade;
import com.sprachwelt.repository.GameRepository;
import com.sprachwelt.facade.TextFacade;
import com.sprachwelt.facade.UserFacade;
import com.sprachwelt.utils.Constants;
import com.sprachwelt.view.GameStatusView;
import com.sprachwelt.view.GameView;
import com.sprachwelt.view.WordView;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/game")
public class GameController {

    @Autowired
    private GameFacade gameFacade;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private TextFacade textFacade;
    @Autowired
    private UserFacade userFacade;
    @Autowired
    private GameRepository gameRepository;

    @GetMapping("/active")
    public GameView getActiveGame() {
        Game activeGame = this.userFacade.getActiveUser().getGame();
        if (activeGame != null) {
            return modelMapper.map(activeGame, GameView.class);
        }
        return null;
    }

    @PostMapping
    public GameView createGame(@RequestBody String textString) {

        Game activeGame = this.userFacade.getActiveUser().getGame();
        if (activeGame != null) {
            throw new GameAlreadyExistsException();
        }

        Text text = textFacade.tokenize(textString);

        text = textFacade.save(text);

        Game game = gameFacade.create(text, Constants.GAME_DEFAULT_LEVEL);

        User user = userFacade.getActiveUser();
        user.setGame(game);

        userFacade.save(user);

        return modelMapper.map(game, GameView.class);
    }

    @PutMapping("{id}/start")
    public GameStatusView startGame(@PathVariable("id") Long id) {
        return modelMapper.map(gameFacade.start(id), GameStatusView.class);
    }

    @PutMapping("{gameId}/remix/{level}")
    public GameView remix(@PathVariable("gameId") Long gameId, @PathVariable("level") int level) {
        return modelMapper.map(gameFacade.remix(gameId, level), GameView.class);
    }

    @PutMapping("{gameId}")
    public GameView save(@RequestBody GameView gameView) {
        Game game = modelMapper.map(gameView, Game.class);
        game = gameFacade.save(game);
        return modelMapper.map(game, GameView.class);
    }

    @PostMapping("{id}/check")
    public List<WordView> checkWords(@PathVariable("id") Long gameId, @RequestBody List<WordView> words) {
        return gameFacade.check(gameId, words);
    }

    @PutMapping("{id}/cancel")
    @ResponseBody
    public void cancel(@PathVariable("id") Long gameId) {
        gameFacade.cancel(gameId);
    }
}
