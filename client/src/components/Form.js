import React, { useState } from "react";
import axios from "axios";

const Form = ({
  isEditing,
  setIsEditing,
  projectList,
  setProjectList,
  itemToEdit,
  setItemToEdit
}) => {
  const [project, setProject] = useState({ name: "", description: "" });

  const fetchProjects = () => {
    axios
      .get("http://localhost:4000/api/projects")
      .then(res => {
        setProjectList(res.data);
      })
      .catch(err => {
        console.log("Error fetching projects: ", err);
      });
  };

  const handleChange = e => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/projects", project)
      .then(() => {
        fetchProjects();
      })
      .catch(err => {
        console.log("error fetching posting new project: ", err);
      });
  };
  return (
    <>
      <h2>Add a Project</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="name"
          onChange={handleChange}
          type="text"
        />
        <input
          name="description"
          placeholder="description"
          onChange={handleChange}
          type="text"
        />
        <button>Submit</button>
      </form>
    </>
  );
};

export default Form;
