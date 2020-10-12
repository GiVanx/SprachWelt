package com.sprachwelt.facade;

import com.sprachwelt.model.Text;
import com.sprachwelt.service.TextService;
import com.sprachwelt.view.WordView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Component
public class TextFacade {

    @Autowired
    private TextService textService;

    @Autowired
    private TextRepositoryFacade textRepositoryFacade;

    public Text save(Text text) {
        return this.textRepositoryFacade.save(text);
    }

    public Text find(long textId) {
        return this.textRepositoryFacade.find(textId);
    }

    public Map<String, Set<Integer>> getWord2PositionMappings(Long textId) {
        return this.textRepositoryFacade.getWord2PositionMappings(textId);
    }

    public Text tokenize(String text) {
        return this.textService.tokenize(text);
    }

    public List<WordView> checkWords(Long textId, List<WordView> words) {
        return this.textService.checkWords(textId, words);
    }
}
