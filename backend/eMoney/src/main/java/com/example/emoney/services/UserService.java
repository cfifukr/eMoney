package com.example.emoney.services;

import com.example.emoney.dtos.RegistrationDto;
import com.example.emoney.enums.Currency;
import com.example.emoney.enums.Role;
import com.example.emoney.models.User;
import com.example.emoney.models.Wallet;
import com.example.emoney.repositories.UserRepository;
import com.example.emoney.utils.Hash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WalletService walletService;



    public List<User> getAll(){
        return userRepository.findAll();
    }


    public User login(String login, String password){

        User user = userRepository.findUserByLogin(login);
        String hashPassword = Hash.toStringHash256(password);

        if( hashPassword == null || user == null || user.getPassword().compareTo(hashPassword) != 0){
            return null;
        }
        return user;
    };

    public User registration(RegistrationDto registrationDto){
        String hashPassword = Hash.toStringHash256(registrationDto.getPassword());
        if(hashPassword == null){
            return null;
        }

        User user = new User().builder()
                .login(registrationDto.getLogin())
                .password(hashPassword)
                .name(registrationDto.getName())
                .role(Role.valueOf(registrationDto.getRole().toUpperCase().strip()))
                .wallets(new ArrayList<>())
                    .build();



        Wallet wallet = Wallet.createWallet("Default wallet", Currency.UAH);
        user.addWallet(wallet);



        return userRepository.save(user);
    }
}
