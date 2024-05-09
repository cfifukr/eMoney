package com.example.emoney.models;


import com.example.emoney.dtos.CreateTransactionDto;
import com.example.emoney.enums.Currency;
import com.example.emoney.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class User {
    @Id
    private String login;

    @Column(nullable = false)
    private String password;

    private String name;

    @Column(nullable = false)
    private Role role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Wallet> wallets = new ArrayList<>();

    public void addWallet(Wallet wallet) {
        wallets.add(wallet);
        wallet.setUser(this);
    }

    public void removeWallet(Wallet wallet) {
        wallets.remove(wallet);
        wallet.setUser(null);
    }





}
