package main.java.com.example.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.springapp.model.Register;
import com.example.springapp.model.Task;
import com.example.springapp.repository.RegisterRepo;


@RestController
@CrossOrigin("*")
public class RegisterController {
    
    @Autowired
	private RegisterRepo registerrepo;
	

	@PostMapping("/register")
	Register newRegister(@RequestBody Register newRegi) {
		return registerrepo.save(newRegi);
	}
}
