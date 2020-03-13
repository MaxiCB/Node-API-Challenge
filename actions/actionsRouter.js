const express = require("express");

const router = express.Router();

const Actions = require("../data/helpers/actionModel");
const Projects = require("../data/helpers/projectModel");

router.use(express.json());

router.get("/", (_req, res) => {
  Actions.get()
    .then(actions => res.status(200).json(actions))
    .catch(_err =>
      res.status(500).json({ errorMessage: "Error retrieving actions" })
    );
});

router.get("/:id", validateActionId, (req, res) => {
  const id = req.params.id;

  Actions.get(id)
    .then(actions => res.status(200).json(actions))
    .catch(_err =>
      res.status(500).json({ errorMessage: "Error fetching actions" })
    );
});

router.post("/", validateProjectIdBody, (req, res) => {
  const { id, description, notes } = req.body;
  const { completed } = req.body || false;

  if (!notes || !description) {
    res.status(400).json({ error: "Action needs a name and description" });
  }

  const action = {
    project_id: id,
    description: description,
    notes: notes,
    completed: completed
  };

  Actions.insert(action)
    .then(action => res.status(201).json(action))
    .catch(_err =>
      res.status(500).json({ errorMessage: "Error adding action" })
    );
});

router.put("/:id", validateProjectId, (req, res) => {
  const { description, notes } = req.body;
  const { completed } = req.body || false;
  const id = req.params.id;

  if (!notes) {
    res.status(400).json({ error: "Request needs notes" });
  }
  if (!description) {
    res.status(400).json({ error: "Request needs description" });
  }

  Actions.update(id, {
    project_id: id,
    description: description,
    notes: notes,
    completed: completed
  })
    .then(project => res.status(201).json(project))
    .catch(_err =>
      res.status(500).json({ errorMessage: "Error updating action" })
    );
});

router.delete("/:id", validateProjectId, (req, res) => {
  const id = req.params.id || req.body;

  Actions.remove(id)
    .then(project => {
      if (project > 0) {
        res.status(200).json({ message: "Deleted action" });
      } else {
        res.status(400).json({ error: "Action could not be deleted" });
      }
    })
    .catch(_err =>
      res.status(500).json({ errorMessage: "Error deleting action" })
    );
});

function validateProjectId(req, res, next) {
  const id = req.params.id || req.body;

  if (!id) {
    res
      .status(400)
      .json({ error: "Request needs a action id parameter", id: id });
  }

  Projects.get(id)
    .then(project => {
      if (project) {
        next();
      } else {
        res.status(404).json({ error: "Project with that id does not exist" });
      }
    })
    .catch(_err =>
      res.status(500).json({ errorMessage: "Error checking for project" })
    );
}

function validateProjectIdBody(req, res, next) {
  const { id } = req.body;

  if (!id) {
    res.status(400).json({ error: "Request needs a action id parameter body" });
  }

  Projects.get(id)
    .then(project => {
      if (project) {
        next();
      } else {
        res
          .status(404)
          .json({ error: "Project with that id does not exist test" });
      }
    })
    .catch(err =>
      res.status(500).json({ errorMessage: "Error checking for project" })
    );
}

function validateActionId(req, res, next) {
  const id = req.params.id;

  if (!id) {
    res.status(400).json({ error: "Request needs a action id parameter" });
  }

  Actions.get(id)
    .then(action => {
      if (action) {
        next();
      } else {
        res.status(404).json({ error: "Action with that id does not exist" });
      }
    })
    .catch(_err =>
      res.status(500).json({ errorMessage: "Error checking for action" })
    );
}

module.exports = router;
