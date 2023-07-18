package com.example.springapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.springapp.model.Task;
import com.example.springapp.model.User;
@Repository
public interface TaskRepo extends JpaRepository<Task,Integer>{
	List<Task> getAllTasks();
	Task createTask(Task task);
	Task getTaskById(Integer id);
	Task updateTask(Integer id,Task task);
	void deleteTask(Integer id);
	void assignTaskToUser(Task taskId,User userId);
	void changeTaskStatus(Task taskId,String status);
	Task getById();
	void assignTask(Task task,User user);


}