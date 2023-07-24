package com.example.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.example.springapp.exception.*;
import com.example.springapp.model.Task;
import com.example.springapp.model.User;
import com.example.springapp.repository.*;
import com.example.springapp.service.*;


@RestController
@RequestMapping("/")
@CrossOrigin("*")
public class UserManageController {
	
	@Autowired
	CustomUserService customUserService;
	@Autowired
	AuthorityDetailsRepository authrepo;
	@Autowired
	UserDetailsRepository userrepo;
	

	@GetMapping("/usermanage")
	List<User> getAllUsers(){
		return userrepo.findAll();
		
	}

	@PutMapping("/usermanage/{id}")
	User updateUser(@RequestBody User newUser,@PathVariable Long id) {
		return userrepo.findById(id).map(user->{
			user.setUsername(newUser.getFirstname());
			user.setFirstname(newUser.getFirstname());
			user.setRole(newUser.getRole());
			return userrepo.save(user);
		}).orElseThrow(()->new UserNotFoundException(id));
	}
	@DeleteMapping("/usermanage/{id}")
	String deleteTask(@PathVariable Long id) {
		if(!userrepo.existsById(id)) {
			throw new UserNotFoundException(id);
		}
		userrepo.deleteById(id);
		return "User with id "+id+" has been deleted success";
	}
	
	

}