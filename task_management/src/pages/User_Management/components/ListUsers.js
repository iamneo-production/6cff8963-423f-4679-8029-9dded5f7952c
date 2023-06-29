import React, { useState , useEffect} from "react";
import HeaderListUsers from "./HeaderListUsers";
import User from "./User";
import "../components_styles/user.css";

export default function ListUsers() {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setUsers(data);
      })
  }, []);
  
  

  const [searchQuery, setSearchQuery] = useState("");
  const filteredUsers = users.filter((user) => {
    const nameMatch = user.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const surnameMatch = user.surname?.toLowerCase().includes(searchQuery.toLowerCase());
    const empidMatch = user.empid?.toLowerCase().includes(searchQuery.toLowerCase());
  
    return nameMatch || surnameMatch || empidMatch;
  });
  
  
  function handleSearchInputChange(e) {
    setSearchQuery(e.target.value);
  }

  return (
    <>
      <HeaderListUsers handleSearchInputChange={handleSearchInputChange} />

      <div className="searchq">
        <label>Search by:</label>
        <input
          type="text"
          placeholder="Search by Name,Surname,Employee Role"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
      </div>

      {filteredUsers.map((user) => (
        <User
          key={user.id}
          name={user.name}
          surname={user.surname}
          emprole={user.emprole}
          emailid={user.emailid}
          passw={user.passw ?? ""}
          id={user.id}
        />
      ))}
    </>
  );
}
