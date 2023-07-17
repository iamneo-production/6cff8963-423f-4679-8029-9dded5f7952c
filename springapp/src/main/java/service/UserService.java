package com.example.springapp.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.springapp.model.User;
import com.example.springapp.repository.UserRepo;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public User create(User user) {
        return userRepo.save(user);
    }

    public User update(Integer userId, User user) {
        return userRepo.updateUser(userId, user);
    }

    public void delete(Integer userId) {
        userRepo.deleteById(userId);
    }

    public User getUserById(Integer userId) {
        return userRepo.findById(userId).get();
    }

    public List<User> getAllUsers() {
        return userRepo.findAll();
    }
}