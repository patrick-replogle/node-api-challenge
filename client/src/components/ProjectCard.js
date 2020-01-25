import React, { useEffect, useState } from "react";
import axios from "axios";

const ProjectCard = props => {
  const [project, setProject] = useState({});
  const [actions, setActions] = useState([]);

  const id = props.match.params.id;

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/projects/${id}`)
      .then(res => {
        setProject(res.data);
      })
      .catch(err => {
        console.log("error fetching project by id: ", err);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/projects/${id}/actions`)
      .then(res => {
        setActions(res.data);
      })
      .catch(err => {
        console.log("error fetching actions: ", err);
      });
  });

  return (
    <div>
      <p>Project Name: {project.name}</p>
      <p>Project Description: {project.description}</p>
      {actions.map(action => {
        return (
          <div key={action.id}>
            <p>Action Name: {action.description}</p>
            <p>Action Description: {action.notes}</p>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectCard;
