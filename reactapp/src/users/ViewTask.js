import axios from "axios";
import React, { useEffect,useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewTask() {
  const [user, setUser] = useState({
    taskname: "",
    description: "",
   duedate: "",
   status:"",
   username:"",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8017/user/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">ViewTask Details</h2>

          <div className="card">
            <div className="card-header">
              Details of user id : {user.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Username :</b>
                  {user.username}
                </li>
                <li className="list-group-item">
                  <b>Taskname :</b>
                  {user.taskname}
                </li>
                <li className="list-group-item">
                  <b>Description :</b>
                  {user.description}
                </li>
                 <li className="list-group-item">
                  <b>DueDate :</b>
                  {user.duedate}
                </li>
                 <li className="list-group-item">
                  <b>Status :</b>
                  {user.status}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/tasklist"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}