package com.sprachwelt.model;

import lombok.Builder;
import lombok.Data;

import javax.persistence.*;

@Data
@Builder
@Entity(name = "word")
public class Word {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "text_id", nullable = false)
    private Text text;

    private String content;
    private Integer position;

    private WordStatus status;
}
