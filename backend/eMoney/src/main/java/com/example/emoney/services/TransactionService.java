package com.example.emoney.services;

import com.example.emoney.dtos.CreateTransactionDto;
import com.example.emoney.enums.Operation;
import com.example.emoney.models.Transaction;
import com.example.emoney.repositories.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {
    private final TransactionRepository transactionRepository;


    public List<Transaction> getTransactionsByPeriod(String username, LocalDate start, LocalDate end){
        LocalDateTime ldtStart = LocalDateTime.of(start, LocalTime.of(0,0));
        LocalDateTime ldtEnd = LocalDateTime.of(end, LocalTime.of(0,0));
        if (ldtStart.isBefore(ldtEnd)) {
            return transactionRepository.findTransactionsByPeriodAndUser(username, ldtStart, ldtEnd);
        }else{
            return transactionRepository.findTransactionsByPeriodAndUser(username, ldtEnd, ldtStart);

        }
    }
    public List<Transaction> getTransactionsByPeriod(String username, LocalDate start, LocalDate end, Operation operation){
        LocalDateTime ldtStart = LocalDateTime.of(start, LocalTime.of(0,0));
        LocalDateTime ldtEnd = LocalDateTime.of(end, LocalTime.of(0,0));
        if (ldtStart.isBefore(ldtEnd)) {
            return transactionRepository.findTransactionsByPeriodAndUser(username, ldtStart, ldtEnd, operation);
        }else{
            return transactionRepository.findTransactionsByPeriodAndUser(username, ldtEnd, ldtStart, operation);

        }
    }




    public Transaction createTransaction(CreateTransactionDto transDto){
        Transaction transaction = new Transaction().builder()
                .money(transDto.getMoney())
                .operation(Operation.valueOf(transDto.getOperation().toUpperCase().strip()))
                .description(transDto.getDescription())
                    .build();

        return transactionRepository.save(transaction);
    }




}
