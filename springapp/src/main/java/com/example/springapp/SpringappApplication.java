package com.example.springapp;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.example.springapp.model.User;
import com.example.springapp.repository.*;
import com.example.springapp.service.AuthorityService;
import com.example.springapp.model.Authority;
import org.springframework.security.core.GrantedAuthority;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringappApplication {


	private static final Logger logger = LoggerFactory.getLogger(SpringappApplication.class);
	@Autowired
	UserDetailsRepository userDetailsRepository;

@Autowired
PasswordEncoder passwordEncoder;

@Autowired
AuthorityDetailsRepository authorityDetailsRepository;

@Autowired
AuthorityService authorityService;
	public static void main(String[] args) {
		SpringApplication.run(SpringappApplication.class, args);
	}


	@PostConstruct
    protected void init() {

        if (userDetailsRepository.findByUsername("saicharanpoleboina@gmail.com") == null) {

            Authority authority = new Authority( 2, "USER");
            authorityService.saveAuthority(authority);

            Authority authority3 = new Authority( 5, "ADMIN");
            authorityService.saveAuthority(authority3);

            List<Authority> authorityList = new ArrayList<>();
            authorityList.addAll(authorityService.findAuthority(1));

            User user = new User();
            user.setUsername("saicharanpoleboina@gmail.com");
            user.setPassword(passwordEncoder.encode("CHara!4545"));
            user.setAuthorites(authorityList);


            userDetailsRepository.save(user);
        }

        if (userDetailsRepository.findByUsername("saicharanpoleboina2@gmail.com") == null) {
            List<Authority> authorityList = new ArrayList<>();
            authorityList.addAll(authorityService.findAuthority(1));

            User user = new User();
            user.setUsername("saicharanpoleboina2@gmail.com");
            user.setPassword(passwordEncoder.encode("CHara!4545"));
            user.setAuthorites(authorityList);


            userDetailsRepository.save(user);

            logger.info(user.getUsername() + " " + user.getPassword());
        }

        if (userDetailsRepository.findByUsername("vishalrambathri11@gmail.com") == null) {
            List<Authority> authorityList = new ArrayList<>();
            authorityList.addAll(authorityService.findAuthority(2));

            User user = new User();
            user.setUsername("vishalrambathri11@gmail.com");
            user.setPassword(passwordEncoder.encode("VIs@123"));
            user.setAuthorites(authorityList);


            userDetailsRepository.save(user);

            logger.info(user.getUsername() + " " + user.getPassword());
        }
	}

}
