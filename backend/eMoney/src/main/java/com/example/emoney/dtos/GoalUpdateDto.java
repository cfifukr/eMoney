package com.example.emoney.dtos;

import com.example.emoney.models.Goal;
import lombok.Data;

@Data
public class GoalUpdateDto {
    private Long id;
    private String goal;
    private Double moneyHave;
    private Double moneyNeed;
    private Boolean isAccomplished;

    public Goal getUpdatedGoal(Goal goal){

        if (this.goal != null && !this.goal.trim().isEmpty()) {
            goal.setGoal(this.goal);
        }
        if (this.moneyHave != null) {
            goal.setMoneyHave(this.moneyHave);
        }
        if (this.moneyNeed != null) {
            goal.setMoneyNeed(this.moneyNeed);
        }
        if (this.isAccomplished != null) {
            goal.setIsAccomplished(this.isAccomplished);
        }

        return goal;
    }


}
