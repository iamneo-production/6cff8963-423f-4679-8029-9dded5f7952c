package com.example.usersmanagerbackend.entity;

import javax.persistence.* ;
import java.time.LocalDate;

@Entity
@Table(name = "Users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "surname")
    private String surname;

    @Column(name = "emprole")
    private String emprole;

    @Column(name = "emailid")
    private String emailid;
    
    @Column(name = "passw")
    private String passw;    

    public User(){};

    public User(Long id, String name, String surname, String emprole , String emailid , String passw) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.emprole=emprole;
        this.emailid=emailid;
        this.passw=passw;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }
    
    public String getEmprole() {
        return emprole;
    }

    public void setEmprole(String  emprole) {
        this.emprole = emprole;
    }
    public String getEmailid() {
        return emailid;
    }

    public void setEmailid(String emailid) {
        this.emailid = emailid;
    }
    
    public String getPassw() {
        return passw;
    }

    public void setPassw(String passw) {
        this.passw = passw;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", emprole=" + emprole +
                ", emailid=" + emailid +
                ", passw="+passw +
                '}';
    }
}