package com.sprachwelt.controller;

import com.sprachwelt.model.Text;
import com.sprachwelt.model.TextWithGaps;
import com.sprachwelt.service.TextService;
import com.sprachwelt.service.TextWithGapsService;
import com.sprachwelt.view.WordView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/text")
public class TextController {

    @Autowired
    private TextService textService;
    @Autowired
    private TextWithGapsService textWithGapsService;

    @PostMapping
    public TextWithGaps addText(@RequestBody String textString) {

        Text text = textService.add(textString);
        System.out.println(text);

        TextWithGaps textWithGaps = textWithGapsService.create(text, 60);
        System.out.println(textWithGaps);

        return textWithGaps;
    }

    @PostMapping("check")
    @ResponseBody
    public Boolean checkWord(@RequestBody WordView wordView) {
        System.out.println(wordView.getWordIdsGroupedByWord().getWordIds());
        return textService.checkWord(wordView.getTextId(), wordView.getWordIdsGroupedByWord(), wordView.getPosition());
    }
}
