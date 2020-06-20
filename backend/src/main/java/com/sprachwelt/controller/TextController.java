package com.sprachwelt.controller;

import com.sprachwelt.model.Text;
import com.sprachwelt.model.TextWithGaps;
import com.sprachwelt.model.Word;
import com.sprachwelt.service.TextService;
import com.sprachwelt.service.TextWithGapsService;
import com.sprachwelt.view.WordStatusView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/text")
public class TextController {

    @Autowired
    private TextService textService;
    @Autowired
    private TextWithGapsService textWithGapsService;

    @GetMapping
    public void get() {

    }

    @PostMapping
    public TextWithGaps addText(@RequestBody String textString) {

        Text text = textService.save(textString);

        TextWithGaps textWithGaps = textWithGapsService.create(text, 50);

        return textWithGaps;
    }

    @PostMapping("{id}/check")
    @ResponseBody
    public List<WordStatusView> checkWords(@PathVariable("id") String textId, @RequestBody List<Word> words) {
        System.out.println("Words" + words);
        return textService.checkWords(textId, words);
    }
}
