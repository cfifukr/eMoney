package com.example.emoney.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class Hash {
    public static String toStringHash256(String input) throws RuntimeException{
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(input.getBytes());

            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }


            return hexString.toString();

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }

    }

    public static void main(String args[]){
        System.out.println(Hash.toStringHash256("test1"));
        System.out.println(Hash.toStringHash256("ehjbfisbdjifsdf"));
        System.out.println(Hash.toStringHash256("test1"));
    }
}
