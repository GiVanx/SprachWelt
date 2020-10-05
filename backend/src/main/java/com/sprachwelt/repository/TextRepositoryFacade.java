package com.sprachwelt.repository;

import com.sprachwelt.model.Text;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TextRepositoryFacade {

    @Autowired
    private TextRepository textRepository;

    public Text save(Text text) {
        text.getWords().forEach(word -> word.setText(text));
        return this.textRepository.save(text);
    }
}
