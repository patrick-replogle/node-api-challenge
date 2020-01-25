import React, { useState } from "react";
import { Route } from "react-router-dom";

import ProjectsList from "./components/ProjectsList";

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
    </div>
  );
}

export default App;
