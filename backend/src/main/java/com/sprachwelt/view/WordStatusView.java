package com.sprachwelt.view;

import com.sprachwelt.model.WordStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WordStatusView {

    private Long id;
    private String text;
    private WordStatus status;
    private Integer position;
}
