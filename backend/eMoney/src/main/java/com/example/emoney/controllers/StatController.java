package com.example.emoney.controllers;

import com.example.emoney.enums.Operation;
import com.example.emoney.models.Transaction;
import com.example.emoney.services.JwtService;
import com.example.emoney.services.TransactionService;
import com.example.emoney.utils.Stat;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;



@RestController
@RequestMapping("/api/v1/stat")
@RequiredArgsConstructor
@CrossOrigin
public class StatController {
    private final JwtService jwtService;
    private final TransactionService transactionService;

    // EXPECTED DATE FORMAT - (YYYY_MM_DD) 2024_11_25

    @GetMapping("/expenses/{dateStart}-{dateEnd}")
    public ResponseEntity<?> getExpensesPeriod(@RequestHeader(HttpHeaders.AUTHORIZATION) String authToken,
                                               @PathVariable String dateStart,
                                               @PathVariable String dateEnd){
        String username = jwtService.extractUsername(authToken.substring(7));

        LocalDate start = LocalDate.parse(dateStart.replace("_", "-"));
        LocalDate end = LocalDate.parse(dateEnd.replace("_", "-"));

        List<Transaction> transactions =  transactionService.getTransactionsByPeriod(username, start, end, Operation.OUT);

        Map<String, Double> map = Stat.getStatByDays(transactions, start, end);

        return ResponseEntity.ok(map);
    }


    @GetMapping("/incomes/{dateStart}-{dateEnd}")
    public ResponseEntity<?> getIncomePeriod(@RequestHeader(HttpHeaders.AUTHORIZATION) String authToken,
                                               @PathVariable String dateStart,
                                               @PathVariable String dateEnd){
        String username = jwtService.extractUsername(authToken.substring(7));

        LocalDate start = LocalDate.parse(dateStart.replace("_", "-"));
        LocalDate end = LocalDate.parse(dateEnd.replace("_", "-"));

        List<Transaction> transactions =  transactionService.getTransactionsByPeriod(username, start, end, Operation.IN);

        Map<String, Double> map = Stat.getStatByDays(transactions, start, end);

        return ResponseEntity.ok(map);
    }


    @GetMapping("/all/{dateStart}-{dateEnd}")
    public ResponseEntity<?> getAllStatPeriod(@RequestHeader(HttpHeaders.AUTHORIZATION) String authToken,
                                               @PathVariable String dateStart,
                                               @PathVariable String dateEnd){
        String username = jwtService.extractUsername(authToken.substring(7));

        LocalDate start = LocalDate.parse(dateStart.replace("_", "-"));
        LocalDate end = LocalDate.parse(dateEnd.replace("_", "-"));

        List<Transaction> transactions =  transactionService.getTransactionsByPeriod(username, start, end);

        Map<String, Double> map = Stat.getStatByDays(transactions, start, end);

        return ResponseEntity.ok(map);
    }

}
