package com.example.springapp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.springapp.model.Task;

public interface TaskRepository extends JpaRepository<Task,Long> {

	Task save(Task newUser);

	List<Task> findAll();

	Optional<Task> findById(Long id);

	boolean existsById(Long id);

	void deleteById(Long id);


}
