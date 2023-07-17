package com.example.springapp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.springapp.model.Task;
import com.example.springapp.model.User;
import com.example.springapp.service.TaskService;

@RestController
@RequestMapping("/tasks")
public class TaskController {
	
	@Autowired
	private TaskService taskservice;
	@GetMapping("/")
	public List<Task> getAllTasks(){
		return taskservice.getAllTasks(); 
	}
	@PostMapping("/tasks")
	public Task createTask(@RequestBody Task task) {
		return taskservice.create(task);
	}
	@PutMapping("/tasks/{id}")
	public Task updateTask(@PathVariable("id") Integer id,@RequestBody Task task) {
		return taskservice.update(id, task);
	}
	@GetMapping("/tasks/{id}")
	public Task getTaskById(@PathVariable("id") Integer id) {
		return taskservice.getTaskById(id);
	}
	@DeleteMapping("/tasks/{id}")
	public void deleteTask(Integer id) {
		taskservice.deleteTask(id);
	}
	
	@PutMapping("/tasks")
	public void assignTask(@RequestBody Task task,@RequestBody User user) {
		taskservice.assignTask(task, user);
	}
}