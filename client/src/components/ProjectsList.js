import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Form from "./Form.js";

const ProjectsList = ({
  isEditing,
  setIsEditing,
  projectList,
  setProjectList,
  itemToEdit,
  setItemToEdit
}) => {
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/projects")
      .then(res => {
        setProjectList(res.data);
      })
      .catch(err => {
        console.log("Error fetching projects: ", err);
      });
  }, [setProjectList]);

  return (
    <div className="projectsContainer">
      <h1>Projects and Actions App!</h1>
      <Form
        projectList={projectList}
        setProjectList={setProjectList}
        isEditing={setIsEditing}
        setIsEditing={setIsEditing}
        itemToEdit={itemToEdit}
        setItemToEdit={setItemToEdit}
      />
      {projectList.map(project => {
        return (
          <Link to={`/project/${project.id}`} key={project.id}>
            {project.name}
          </Link>
        );
      })}
    </div>
  );
};

export default ProjectsList;
