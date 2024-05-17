package com.example.emoney;

import com.example.emoney.models.Role;
import com.example.emoney.services.RoleService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EMoneyApplication {

    public static void main(String[] args) {
        SpringApplication.run(EMoneyApplication.class, args);
    }

}
