package com.sprachwelt.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.LinkedHashSet;
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
    private Set<Word> missingWords = new LinkedHashSet<>();

    @OneToMany(fetch = FetchType.EAGER)
    @OrderBy(value = "position")
    private Set<Word> textWithGaps = new LinkedHashSet<>();
}
