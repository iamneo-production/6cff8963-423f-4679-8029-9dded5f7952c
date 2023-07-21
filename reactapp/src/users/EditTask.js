import axios from "axios";
import  { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    taskname: "",
    description: "",
    duedate: "",
    status:"",
  });

  const { taskname, description, duedate,status } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`https://8080-ddaedfbeaebcdffcebcccefaedfbdbebed.project.examly.io/user/${id}`, user);
  };

  const loadUser = async () => {
    const result = await axios.get(`https://8080-ddaedfbeaebcdffcebcccefaedfbdbebed.project.examly.io/user/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Task</h2>

          <form onSubmit={(e) => onSubmit(e)}>
             <div className="mb-3">
              <label htmlFor="taskname" className="form-label">
                Taskname
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your taskname"
                name="taskname"
                value={taskname}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
               Description  
              </label>
              <textarea
                type={"text"}
                className="form-control"
                placeholder="Enter your description"
                name="description"
                value={description}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="duedate" className="form-label">
              DueDate
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Date"
                name="duedate"
                value={duedate}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Status" className="form-label">
               Status
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Status"
                name="status"
                value={status}
                onChange={(e) => onInputChange(e)}
              />
            </div>
           
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/home">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}