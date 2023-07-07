package com.example.springapp.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.springapp.model.*;
import com.example.springapp.repository.TaskRepo;
import com.example.springapp.repository.UserRepo;

@Service
public class TaskService {
	@Autowired
	private TaskRepo taskrepo;
	@Autowired
	private UserRepo userrepo;
	
	public List<Task> getAllTasks(){
		return taskrepo.findAll();
	}
	public Task create(Task task) {
		return taskrepo.saveAndFlush(task);
	}
	//@SuppressWarnings("deprecation")
	public Task getTaskById(Integer taskId) {
		return taskrepo.getById();
	}
	public Task update(Integer taskId,Task task) {
		return taskrepo.updateTask(taskId, task);
	}
	public void assignTask(Task task,User user) {
		taskrepo.save(task);
		userrepo.save(user);
	}
	public void deleteTask(Integer taskId) {
		Task task=taskrepo.findById(taskId).get();
		if(task!=null) {
			taskrepo.deleteById(taskId);
		}
	}
	
}
