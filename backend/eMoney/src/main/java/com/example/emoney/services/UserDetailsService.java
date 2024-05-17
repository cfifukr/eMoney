package com.example.emoney.services;

import com.example.emoney.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public  class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {
    
    private final UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        return userRepository.findUserByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException("User wasnt found with username: " + username));
    }
}
