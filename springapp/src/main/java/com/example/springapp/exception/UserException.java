package main.java.com.example.springapp.exception;


public class UserException extends RuntimeException {
    public UserException(String message) {
        super(message);
    }
}