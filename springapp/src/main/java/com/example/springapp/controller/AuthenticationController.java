package com.example.springapp.controller;

import java.io.Console;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.Principal;
import java.security.spec.InvalidKeySpecException;


import org.apache.catalina.startup.UserConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.GrantedAuthority;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import main.java.com.example.springapp.exception.UserException;

import com.example.springapp.config.JWTTokenHelper;
import com.example.springapp.model.User;
import com.example.springapp.request.AuthenticationRequest;
import com.example.springapp.response.LoginResponse;
import com.example.springapp.response.UserInfo;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin
public class AuthenticationController {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTTokenHelper jwtTokenHelper;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody AuthenticationRequest authenticationRequest)
            throws InvalidKeySpecException, NoSuchAlgorithmException {

        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationRequest.getUserName(), authenticationRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        User user = (User) authentication.getPrincipal();

        logger.info(user.getAuthorities().toString());

        String jwt = jwtTokenHelper.generateToken(user.getUsername());

        logger.info(jwt);

        LoginResponse response = new LoginResponse();
        response.setToken(jwt);

        return ResponseEntity.ok(response);
    }


    @GetMapping("/auth/userinfo")
    public Boolean getUserInfo(Principal user) {
        if (user == null) {
            throw new UserException("This is invalid");
        }
    
        User userObj = (User) userDetailsService.loadUserByUsername(user.getName());
    
        UserInfo userInfo = new UserInfo();
        userInfo.setUsername(userObj.getUsername());
        userInfo.setUserRoles(userObj.getAuthorites().toArray());
    
        logger.info(userObj.toString());
    
        return true;
    }
    





}

 
    

