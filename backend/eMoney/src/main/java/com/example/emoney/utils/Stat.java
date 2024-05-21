package com.example.emoney.utils;

import com.example.emoney.enums.Operation;
import com.example.emoney.models.Transaction;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Stat {
    public static DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ISO_LOCAL_DATE;
    public static Map<String, Double> getStatByDays(List<Transaction> listTrans,
                                                                   LocalDate start,
                                                                   LocalDate end){

        Map<String, Double> statistic = new HashMap<>();
        List<LocalDate> dates = (start.isBefore(end)? start.datesUntil(end).toList() : end.datesUntil(start).toList());

        //add days without transactions
        for(LocalDate date : dates){
            statistic.put(date.format(dateTimeFormatter),
                    statistic.getOrDefault(date.format(dateTimeFormatter), 0.00));
        }
        //transaction list to map  + counting by day
        for(Transaction transaction: listTrans){
            String key = transaction.getCreatedTime().format(dateTimeFormatter);
            Double value = statistic.getOrDefault(key, 0.00) +
                    (transaction.getOperation() == Operation.IN ? transaction.getMoney() : transaction.getMoney()*(-1));
            statistic.put(key, value);
        }

        return statistic;



    }
}
