package com.example.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springapp.model.User;
@Repository
public interface UserRepo extends JpaRepository<User,Integer> {
	List<User> getAllUsers();
	User createUser(User user);
	User getUserById(Integer id);
	User updateUser(Integer id,User user);
	void deleteUser(Integer id);

}
