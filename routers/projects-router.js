const express = require("express");
const Projects = require("../data/helpers/projectModel.js");

const router = express.Router();

//get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Projects.get();
    if (projects.length > 0) {
      return res.status(200).json(projects);
    } else {
      res
        .status(404)
        .json({ message: "There are currently no projects in the database" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Projects could not be retrieved at this time"
    });
  }
});

//get project by id
router.get("/:id", async (req, res) => {
  try {
    const project = await Projects.get(req.params.id);
    if (project) {
      return res.status(200).json(project);
    } else {
      res.status(404).json({ message: "Specified project id does not exist" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "The specified project id could not be retrieved at this time"
    });
  }
});

//add a new project
router.post("/", async (req, res) => {
  try {
    const newProject = {
      name: req.body.name,
      description: req.body.description
    };
    if (!req.body.name || !req.body.description) {
      res
        .status(400)
        .json({ message: "Please include name and description fields" });
    } else {
      res.status(201).json(await Projects.insert(newProject));
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Project could not be added at this time"
    });
  }
});

//update a project
router.put("/:id", async (req, res) => {
  try {
    const updated = {
      name: req.body.name,
      description: req.body.description
    };
    if (!req.body.name || !req.body.description) {
      res.status(400).json("Please include name and description fields");
    }
    const project = await Projects.get(req.params.id);
    if (project) {
      return res
        .status(201)
        .json(await Projects.update(req.params.id, updated));
    } else {
      res
        .status(404)
        .json({ message: "The specified project id does not exist" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Project could not be updated at this time"
    });
  }
});

//delete a project

module.exports = router;
