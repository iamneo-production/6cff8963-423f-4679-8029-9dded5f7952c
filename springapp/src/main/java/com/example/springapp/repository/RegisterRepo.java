package com.example.springapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.model.Register;

public interface RegisterRepo extends JpaRepository<Register,Integer>{

}