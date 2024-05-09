package com.example.emoney.services;

import com.example.emoney.dtos.CreateTransactionDto;
import com.example.emoney.enums.Operation;
import com.example.emoney.models.Transaction;
import com.example.emoney.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    public Transaction createTransaction(CreateTransactionDto transDto){
        Transaction transaction = new Transaction().builder()
                .money(transDto.getMoney())
                .operation(Operation.valueOf(transDto.getOperation().toUpperCase().strip()))
                .description(transDto.getDescription())
                    .build();

        return transactionRepository.save(transaction);
    }




}
