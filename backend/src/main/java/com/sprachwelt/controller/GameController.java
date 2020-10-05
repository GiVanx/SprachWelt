package com.sprachwelt.controller;

import com.sprachwelt.auth.model.User;
import com.sprachwelt.model.Game;
import com.sprachwelt.model.Text;
import com.sprachwelt.model.Word;
import com.sprachwelt.repository.GameFacade;
import com.sprachwelt.repository.GameRepository;
import com.sprachwelt.repository.TextRepositoryFacade;
import com.sprachwelt.service.TextService;
import com.sprachwelt.service.UserFacade;
import com.sprachwelt.utils.Constants;
import com.sprachwelt.view.GameView;
import com.sprachwelt.view.WordStatusView;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/game")
public class GameController {

    @Autowired
    private TextService textService;
    @Autowired
    private GameFacade gameFacade;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private TextRepositoryFacade textRepositoryFacade;
    @Autowired
    private UserFacade userFacade;
    @Autowired
    private GameRepository gameRepository;

    @GetMapping("/active")
    public GameView getActiveGame() {
        return modelMapper.map(this.userFacade.getActiveUser().getGame(), GameView.class);
    }

    @PostMapping
    public GameView createGame(@RequestBody String textString) {

        Text text = textService.tokenize(textString);

        text = textRepositoryFacade.save(text);

        Game game = gameFacade.create(text, Constants.GAME_DEFAULT_LEVEL);

        User user = userFacade.getActiveUser();
        user.setGame(game);

        userFacade.save(user);

        return modelMapper.map(game, GameView.class);
    }

    @PutMapping("{id}/start")
    public GameView startGame(@PathVariable("id") Long id) {
        return modelMapper.map(gameFacade.start(id), GameView.class);
    }

    @PutMapping("{gameId}/remix/{level}")
    public GameView remix(@PathVariable("gameId") Long gameId, @PathVariable("level") int level) {
        return modelMapper.map(gameFacade.remix(gameId, level), GameView.class);
    }

    @PostMapping("{id}/check")
    @ResponseBody
    public List<WordStatusView> checkWords(@PathVariable("id") String textId, @RequestBody List<Word> words) {
        System.out.println("Words" + words);
        return textService.checkWords(textId, words);
    }
}
