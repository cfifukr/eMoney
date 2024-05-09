package com.example.emoney.dtos;

import com.example.emoney.enums.Role;
import com.example.emoney.models.User;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserReponseDto {
    private String login;
    private String name;
    private Role role;
    private List<WalletResponseDto> walletResponseDto;

    public static UserReponseDto getDto(User user){
        UserReponseDto dto = UserReponseDto.builder()
                .login(user.getLogin())
                .name(user.getName())
                .role(user.getRole())
                    .build();

        dto.setWalletResponseDto(user.getWallets().stream()
                .map(i -> WalletResponseDto.getDto(i)).toList());
        return dto;
    }
}
