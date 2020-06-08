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

  const deleteProject = () => {
    axios
      .delete(`http://localhost:4000/api/projects/${id}`)
      .then(() => {
        props.history.push("/");
      })
      .catch(err => {
        console.log("error deleting project: ", err);
      });
  };

  return (
    <div className="projectCard">
      <h2>Project Info</h2>
      <p>{project.name}</p>
      <p>{project.description}</p>
      <h2>Actions Below: </h2>
      {actions.map(action => {
        return (
          <div key={action.id}>
            <p>{action.description}</p>
            <p>{action.notes}</p>
          </div>
        );
      })}
      <button onClick={() => props.history.push("/")}>back</button>
      <button onClick={deleteProject}>Delete</button>
      <button>Edit</button>
    </div>
  );
};

export default ProjectCard;
