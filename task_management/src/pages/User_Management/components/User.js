import React, { useState } from "react";
import UpdateUser from "./UpdateUser";
import "../components_styles/user.css";

export default function User(props) {
  const { name, surname, emprole, emailid, passw,id} = props;
  const [update, setUpdate] = useState(false)


  function handleDelete() {
    const request = new Request("http://localhost:8080/api/users/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    fetch(request)
      .then((res) => {        
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  }
  
    function handleUpdate(){
        setUpdate(prevState => !prevState)
    }
  

  return (
    <div className="user">
      <div className="userData">
        <p>Name: {name}</p>
        <p>Surname: {surname}</p>
        <p>Employee Role: {emprole}</p>
        <p>Email ID: {emailid}</p>
        <p>Password: {"*".repeat(passw.length)}</p>

      </div>
      <button onClick={handleUpdate} className={update ? "closeBtn" : "updateBtn"}>{update ? "Close" : "Update"}</button>
      <button onClick={handleDelete} className={update ? "closeDeleteBtn" : "deleteBtn"} >Delete</button>
            {update ? <UpdateUser
                name = {name}
                surname = {surname}
                emprole = {emprole}
                emailid = {emailid}
                passw={passw}
                id = {id}
                update = {setUpdate}
            />
            : <div></div>}
      
    </div>
  );
}
