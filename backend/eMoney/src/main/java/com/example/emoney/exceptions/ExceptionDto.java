package com.example.emoney.exceptions;



import java.util.Date;


public class ExceptionDto {

    private Integer code;

    private String description;

    private Date date;

    public ExceptionDto(Integer code, String description) {
        this.code = code;
        this.description = description;
        this.date = new Date();
    }
}
