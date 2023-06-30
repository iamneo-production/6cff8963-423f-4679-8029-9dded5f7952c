package com.example.springapp.controller;

import com.example.springapp.entity.User;
import com.example.springapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    @GetMapping("/api/users")
    public List<User> findUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/api/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        if (user.getId() != null) { 
            return ResponseEntity.badRequest().build();
        }
        User result = userRepository.save(user);

        // Send welcome email to the created user
        sendWelcomeEmail(result);

        return ResponseEntity.ok(result);
    }

    @PutMapping("/api/users")
    public ResponseEntity<User> updateUser(@RequestBody User user) {
        if (user.getId() == null) {
            return ResponseEntity.badRequest().build();
        }

        if (!userRepository.existsById(user.getId())) {
            return ResponseEntity.badRequest().build();
        }

        User result = userRepository.save(user);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/api/users/{id}")
    public ResponseEntity<User> deleteById(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private void sendWelcomeEmail(User user) {
        String emailTo = user.getEmailid();

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(emailTo);
        message.setSubject("Welcome to Task Management Portal");
        message.setText("Dear " + user.getName() + ",\n\nWelcome! You have been successfully added as a user.\n\nYour Login credentials:\nUsername: "+user.getEmailid()+"\nPassword: "+user.getPassw());

        javaMailSender.send(message);
    }
}