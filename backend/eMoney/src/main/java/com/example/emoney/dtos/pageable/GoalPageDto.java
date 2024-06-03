package com.example.emoney.dtos.pageable;

import com.example.emoney.dtos.response.GoalResponseDto;
import lombok.NoArgsConstructor;

import java.util.List;


@NoArgsConstructor
public class GoalPageDto extends PageDto{
    public GoalPageDto(Integer total, Integer totalPage, Integer currentPage, List<GoalResponseDto> responseDtos) {
        super(total, totalPage, currentPage, responseDtos);
    }

}
