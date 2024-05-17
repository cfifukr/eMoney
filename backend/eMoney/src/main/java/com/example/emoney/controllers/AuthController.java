package com.example.emoney.controllers;


import com.example.emoney.dtos.AuthenticationResponseDto;
import com.example.emoney.dtos.RegistrationDto;
import com.example.emoney.exceptions.ExceptionDto;
import com.example.emoney.models.User;
import com.example.emoney.services.JwtService;
import com.example.emoney.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("api/v1/")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final UserService userService;

    private final JwtService jwtService;

    @PostMapping("/signup")
    public ResponseEntity<?> registration(@RequestBody RegistrationDto registrationDto){
        if(userService.findByUsername(registrationDto.getUsername()).isPresent()){
            return new ResponseEntity<>(new ExceptionDto(HttpStatus.IM_USED.value(), "User with such username was already created"), HttpStatus.OK);
        }

        User user = userService.registration(registrationDto);

        String token = jwtService.generateToken(user);

        return new ResponseEntity<>(new AuthenticationResponseDto(token), HttpStatus.CREATED);

    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginDto){

        User user = userService.login(loginDto.get("username"), loginDto.get("password"));
        //log.info(user.getUsername() + " " + user.getPassword() + " " + user.getName() +  " " +user.getRoles().toString());

        if(user == null){
            return new ResponseEntity<>(new ExceptionDto(HttpStatus.NOT_FOUND.value(),
                    String.format("User with username: '%s' and password wasn't found", loginDto.get("username"))), HttpStatus.OK);
        }
        String token = jwtService.generateToken(user);


        return new ResponseEntity<>(new AuthenticationResponseDto(token), HttpStatus.OK);

    }
    @GetMapping("/info")
    public String info(Principal principal){
        return principal.toString();
    }
}
