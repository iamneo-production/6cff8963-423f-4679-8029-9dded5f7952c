package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import com.example.springapp.model.User;

@Repository
public interface UserDetailsRepository extends JpaRepository<User, Long>{
	
	User findByUsername(String username);

}

