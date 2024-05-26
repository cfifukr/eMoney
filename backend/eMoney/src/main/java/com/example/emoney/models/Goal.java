package com.example.emoney.models;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Goal {
    @Id
    private long id;

}
