package com.sprachwelt.auth.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TokensDto {

    private String jwtToken;
}
