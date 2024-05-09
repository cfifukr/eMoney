package com.example.emoney.dtos;

import com.example.emoney.enums.Currency;
import com.example.emoney.models.Wallet;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class WalletResponseDto {
    private Long id;

    private Double balance;

    private String name;

    private Currency currency;

    private List<TransactionResponseDto> transactions;


    public static WalletResponseDto getDto(Wallet wallet){
        WalletResponseDto walletDto = WalletResponseDto.builder()
                .id(wallet.getId())
                .balance(wallet.getBalance())
                .name(wallet.getName())
                .currency(wallet.getCurrency())
                .build();

        walletDto.setTransactions(wallet.getTransactions()
                .stream().map(i -> TransactionResponseDto.getDto(i)).toList());

        return walletDto;
    }

}
