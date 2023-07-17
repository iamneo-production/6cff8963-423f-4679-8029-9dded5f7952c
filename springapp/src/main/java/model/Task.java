package com.example.springapp.model;



import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Task {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int taskId;
    private String name;
    private String description;
    private String dueDate;
    private String status;
    private User assignedUser;
	public Task() {
		super();
	}
	public int getId() {
		return taskId;
	}
	public void setId(int id) {
		this.taskId = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getDueDate() {
		return dueDate;
	}
	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public User getAssignedUser() {
		return assignedUser;
	}
	public void setAssignedUser(User assignedUser) {
		this.assignedUser = assignedUser;
	}
    
	@Override
	public String toString() {
		return "Task [id=" + taskId + ", name=" + name + ", description=" + description + ", dueDate=" + dueDate
				+ ", status=" + status + ", assignedUser=" + assignedUser + "]";
	}
	
    

}