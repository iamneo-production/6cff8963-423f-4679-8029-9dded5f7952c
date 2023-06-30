import React, { useState, useEffect } from "react";
import "../components_styles/user.css";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";

export default function Userslist() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterOption, setFilterOption] = useState("name"); // Set a default value here

  const filteredUsers = users.filter((user) => {
    const searchField = user[filterOption]?.toLowerCase();
    return Object.values(user).some((value) =>
      String(value).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (sortOrder === "asc") {
      return (
        a[filterOption]?.localeCompare(b[filterOption]) || // Handle undefined value
        a.name.localeCompare(b.name) // Sort by name as fallback
      );
    } else {
      return (
        b[filterOption]?.localeCompare(a[filterOption]) || // Handle undefined value
        b.name.localeCompare(a.name) // Sort by name as fallback
      );
    }
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }, []);

  function handleSearchInputChange(e) {
    setSearchQuery(e.target.value);
  }

  function handleSortOrderChange() {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  }

  function handleFilterOptionChange(e) {
    setFilterOption(e.target.value);
  }

  return (
    <>
      <div className="searchContainer">
        <label>Search by: </label>
        <input
          type="text"
          placeholder="Search by Name, Surname, Employee Role"
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="searchInput"
        />
        <div className="filterOptions">
          <label>
            Filter by:
            <select value={filterOption} onChange={handleFilterOptionChange}>
              <option value="name">First Name</option>
              <option value="surname">Last Name</option>
              <option value="emprole">Role</option>
            </select>
          </label>
        </div>
        <label>Sort by:</label>
        <button className="sortButton" onClick={handleSortOrderChange}>
          {sortOrder === "asc" ? (
            <FaSortAlphaUp className="sortIcon" />
          ) : (
            <FaSortAlphaDown className="sortIcon" />
          )}
        </button>
      </div>

      {sortedUsers.map((user) => (
        <div className="user" key={user.id}>
          <div className="userData">
            <p>Name: {user.name}</p>
            <p>Surname: {user.surname}</p>
            <p>Employee Role: {user.emprole}</p>
            <p>Email ID: {user.emailid}</p>
            <p>Password: {"*".repeat(user.passw.length)}</p>
          </div>
        </div>
      ))}
    </>
  );
}
