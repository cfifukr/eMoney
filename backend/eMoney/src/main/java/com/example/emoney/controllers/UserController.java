package com.example.emoney.controllers;


import com.example.emoney.dtos.CreateTransactionDto;
import com.example.emoney.dtos.RegistrationDto;
import com.example.emoney.dtos.UserReponseDto;

import com.example.emoney.dtos.WalletResponseDto;
import com.example.emoney.models.User;
import com.example.emoney.models.Wallet;
import com.example.emoney.services.UserService;
import com.example.emoney.services.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private WalletService walletService;




    // NEED TO SET UP SPRING SECURITY
    @PostMapping("/{walletPath}/transactions")
    public ResponseEntity<?> makeTransaction(@PathVariable Long walletPath,
                                             @RequestBody CreateTransactionDto transDto,
                                             Principal principal){

        Optional<Wallet> walletOptional = walletService.findWalletById(walletPath);


        if(walletOptional.isPresent()) {
            Wallet wallet = walletService.saveWallet(walletOptional.get().makeTransaction(transDto));
            return new ResponseEntity<>(WalletResponseDto.getDto(wallet), HttpStatus.OK);

        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

}
