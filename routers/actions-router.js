const express = require("express");
const Actions = require("../data/helpers/actionModel.js");

const router = express.Router();

//get all actions
router.get("/", (req, res) => {
  Actions.get()
    .then(actions => {
      if (actions.length > 0) {
        return res.status(200).json(actions);
      } else {
        res
          .status(404)
          .json({ message: "The currently are no project actions" });
      }
    })
    .catch(error => {
      res.status(500).json({
        succes: false,
        error: "Actions could not be retrieved at this time"
      });
    });
});

//get actions by id
router.get("/:id", (req, res) => {
  Actions.get(req.params.id)
    .then(action => {
      if (action) {
        return res.status(200).json(action);
      } else {
        res
          .status(404)
          .json({ message: "The specified action id does not exist" });
      }
    })
    .catch(error => {
      res.status(500).json({
        success: false,
        error: "The specified action id could not be retrieved at this time"
      });
    });
});

//add a new action
router.post("/:id", (req, res) => {
  const newAction = {
    description: req.body.description,
    notes: req.body.notes,
    project_id: req.params.id
  };
  if (!req.body.description || !req.body.notes) {
    res.status(400).json({ message: "Please include description and notes" });
  }
  Actions.get(req.params.id)
    .then(action => {
      if (action) {
        return Actions.insert(newAction).then(data =>
          res.status(201).json(data)
        );
      } else {
        res.status(404).json({ message: "That project Id does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: "Action could not be added at this time"
      });
    });
});

//update an action
router.put("/:id", (req, res) => {
  const updated = {
    description: req.body.description,
    notes: req.body.notes
  };
  if (!req.body.description || !req.body.notes) {
    res
      .status(400)
      .json({ message: "Description and notes fields must be included" });
  }
  Actions.get(req.params.id)
    .then(action => {
      if (action) {
        return Actions.update(req.params.id, updated);
      } else {
        res
          .status(404)
          .json({ message: "The specified action id does not exist" });
      }
    })
    .then(() => Actions.get(req.params.id))
    .then(action => res.status(200).json(action))
    .catch(error => {
      res.status(500).json({
        success: false,
        error: "The action could not be updated at this time"
      });
    });
});

//delete an action
router.delete("/:id", (req, res) => {
  Actions.get(req.params.id)
    .then(action => {
      if (action) {
        return Actions.remove(req.params.id);
      } else {
        res.status(404).json({ message: "The specified id does not exist" });
      }
    })
    .then(() => res.status(204).end())
    .catch(error => {
      res.status(500).json({
        success: false,
        error: "Action could not be deleted at this time"
      });
    });
});

module.exports = router;
