package com.sprachwelt.facade;

import com.sprachwelt.model.Text;
import com.sprachwelt.repository.TextRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class TextRepositoryFacade {

    @PersistenceContext
    EntityManager entityManager;

    @Autowired
    private TextRepository textRepository;

    public Text save(Text text) {
        text.getWords().forEach(word -> word.setText(text));
        return this.textRepository.save(text);
    }

    public Text find(long textId) {
        return textRepository.getOne(textId);
    }

    public Map<String, Set<Integer>> getWord2PositionMappings(Long textId) {
        List<Object[]> list = entityManager.createNativeQuery("select content, array_to_string(array_agg(position), ',') as positions\n" +
                "from word\n" +
                "where text_id = \n" + textId +
                "group by content").getResultList();

        Map<String, Set<Integer>> word2PositionMap = new HashMap<>();

        for (Object[] result : list) {

            Set<Integer> positions = Arrays.asList(((String) result[1]).split(",")).stream().map(s -> Integer.parseInt(s))
                    .collect(Collectors.toSet());

            word2PositionMap.put((String) result[0], positions);
        }
        return word2PositionMap;
    }
}
