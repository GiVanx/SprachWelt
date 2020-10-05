package com.sprachwelt.auth.model;

import com.sprachwelt.model.Game;
import lombok.*;

import javax.persistence.*;

@Entity(name = "app_user")
@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String name;
    private String picture;

    @ManyToOne
    private Game game;
}
