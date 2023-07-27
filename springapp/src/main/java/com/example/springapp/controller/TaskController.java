package com.example.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.springapp.exception.TaskNotFoundException;
import com.example.springapp.model.Task;
import com.example.springapp.repository.TaskRepository;

@RestController
@CrossOrigin("*")
public class TaskController {
	@Autowired
	private TaskRepository taskrepo;
	
	
	@PostMapping("/tasks")
	Task newTask(@RequestBody Task newUser) {
		return taskrepo.save(newUser);
	}
	@GetMapping("/tasks")
	List<Task> getAllTasks(){
		return taskrepo.findAll();
	}
	@GetMapping("/tasks/{id}")
	Task getTaskById(@PathVariable Long id) {
	return taskrepo.findById(id).orElseThrow(()->new TaskNotFoundException(id));
	}

	@PutMapping("/tasks/{id}")
	Task updateTask(@RequestBody Task newTask,@PathVariable Long id) {
		return taskrepo.findById(id).map(task->{
			task.setTaskname(newTask.getTaskname());
			task.setDescription(newTask.getDescription());
			task.setDuedate(newTask.getDuedate());
			task.setStatus(newTask.getStatus());
			task.setUsername(newTask.getUsername());
			return taskrepo.save(task);
		}).orElseThrow(()->new TaskNotFoundException(id));
	}
	@DeleteMapping("/tasks/{id}")
	String deleteTask(@PathVariable Long id) {
		if(!taskrepo.existsById(id)) {
			throw new TaskNotFoundException(id);
		}
		taskrepo.deleteById(id);
		return "User with id "+id+" has been deleted success";
	}
	
	
	
		
		
	
}