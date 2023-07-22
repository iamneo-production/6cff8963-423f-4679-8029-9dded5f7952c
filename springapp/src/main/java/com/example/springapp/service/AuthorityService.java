package com.example.springapp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.springapp.model.Authority;
import com.example.springapp.repository.AuthorityDetailsRepository;

import java.util.*;

@Service
public class AuthorityService {

			@Autowired
			AuthorityDetailsRepository authorityDetailsRepository;
			
			public List<Authority> findAuthority(long id)
			{
				return authorityDetailsRepository.findByid(id);
			}
			
			
			
			public void saveAuthority(Authority authority)
			{
				authorityDetailsRepository.save(authority);
			}
			
	
}