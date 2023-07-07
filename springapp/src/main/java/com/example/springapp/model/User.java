package com.example.springapp.model;

import java.util.List;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User {
		@Id
		@GeneratedValue(strategy=GenerationType.IDENTITY)
		private int userId;
	    private String name;
	    private String email;
	    private List<Task> tasks;
	    public User() {
			super();
		}
		public int getId() {
			return userId;
		}
		public void setId(int id) {
			this.userId = id;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public List<Task> getTasks() {
			return tasks;
		}
		public void setTasks(List<Task> tasks) {
			this.tasks = tasks;
		}
		@Override
		public String toString() {
			return "User [id=" + userId + ", name=" + name + ", email=" + email + "]";
		}

}
