import React, { useState } from "react";
import { Route } from "react-router-dom";

import ProjectsList from "./components/ProjectsList";
import ProjectCard from "./components/ProjectCard";

import "./App.css";

function App() {
  const [projectList, setProjectList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [itemToEdit, setItemToEdit] = useState({});
  return (
    <div className="App">
      <Route
        exact
        path="/"
        render={props => (
          <ProjectsList
            {...props}
            projectList={projectList}
            setProjectList={setProjectList}
          />
        )}
      />
      <Route
        path="/project/:id"
        render={props => {
          return (
            <ProjectCard
              {...props}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              itemToEdit={itemToEdit}
              setItemToEdit={setItemToEdit}
              projectList={projectList}
              setProjectList={setProjectList}
            />
          );
        }}
      />
    </div>
  );
}

export default App;
