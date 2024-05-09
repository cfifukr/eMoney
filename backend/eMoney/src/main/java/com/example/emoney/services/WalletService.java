package com.example.emoney.services;

import com.example.emoney.models.Wallet;
import com.example.emoney.repositories.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class WalletService {
    @Autowired
    private WalletRepository walletRepository;


    @Transactional
    public Wallet saveWallet(Wallet wallet){
        return walletRepository.save(wallet);
    }

    public Optional<Wallet> findWalletById(Long id){
        return walletRepository.findById(id);
    }
}
