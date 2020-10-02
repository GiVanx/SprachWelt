package com.sprachwelt.controller;

import com.sprachwelt.model.Text;
import com.sprachwelt.model.Game;
import com.sprachwelt.model.Word;
import com.sprachwelt.service.TextService;
import com.sprachwelt.service.GameService;
import com.sprachwelt.view.GameView;
import com.sprachwelt.view.WordStatusView;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/game")
public class TextController {

    @Autowired
    private TextService textService;
    @Autowired
    private GameService gameService;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public Game getActiveGame() {
        return null;
    }

    @PostMapping
    public GameView addText(@RequestBody String textString) {

        Text text = textService.save(textString);

        Game game = gameService.create(text, 50);

        return modelMapper.map(game, GameView.class);
    }

    @PostMapping("{id}/check")
    @ResponseBody
    public List<WordStatusView> checkWords(@PathVariable("id") String textId, @RequestBody List<Word> words) {
        System.out.println("Words" + words);
        return textService.checkWords(textId, words);
    }
}
