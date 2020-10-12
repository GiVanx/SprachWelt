package com.sprachwelt.view;

import com.sprachwelt.model.WordStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class WordView {
    private Long id;
    private String content;
    private Integer position;
    private WordStatus status;
}
