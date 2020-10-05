package com.sprachwelt.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "game")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private GameStatus status;

    @OneToOne
    private Text text;

    @OneToMany(fetch = FetchType.EAGER)
    private Set<Word> missingWords;

    @OneToMany(fetch = FetchType.EAGER)
    private List<Word> textWithGaps;
}
