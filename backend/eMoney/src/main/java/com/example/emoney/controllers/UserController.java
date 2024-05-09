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

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private WalletService walletService;




    @GetMapping()
    public ResponseEntity<List<UserReponseDto>> getAll(){

        List<User> users = userService.getAll();
        return new ResponseEntity<>(users.stream().map(i -> UserReponseDto.getDto(i)).toList(), HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<UserReponseDto> registration(@RequestBody RegistrationDto registrationDto){
        User user = userService.registration(registrationDto);

        return new ResponseEntity<>(UserReponseDto.getDto(user), HttpStatus.OK);



    }

    @PostMapping("/login")
    public ResponseEntity<UserReponseDto> login(@RequestBody Map<String, String> loginDto){
        User user = userService.login(loginDto.get("login"), loginDto.get("password"));

        return new ResponseEntity<>(UserReponseDto.getDto(user), HttpStatus.OK);

    }




    // NEED TO SET UP SPRING SECURITY
    @PostMapping("/{walletPath}/transactions")
    public ResponseEntity<WalletResponseDto> makeTransaction(@PathVariable Long walletPath,
                                             @RequestBody CreateTransactionDto transDto){

        Wallet walletFound = walletService.findWalletById(walletPath).get();
        Wallet wallet = walletService.saveWallet(walletFound.makeTransaction(transDto)) ;

        return new ResponseEntity<>(WalletResponseDto.getDto(wallet), HttpStatus.OK);
    }

}
