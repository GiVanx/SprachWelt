package com.sprachwelt.view;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class WordView {
    private String id;
    private String text;
}
