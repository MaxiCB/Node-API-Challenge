const express = require("express");

const router = express.Router();

const Projects = require("../data/helpers/projectModel");

router.use(express.json());

router.get("/", (_req, res) => {
  Projects.get()
    .then(projects => res.status(200).json(projects))
    .catch(_err =>
      res.status(500).json({ errorMessage: "Error retrieving projects" })
    );
});

router.get("/:id", validateProjectId, (req, res) => {
  const id = req.params.id;

  Projects.get(id)
    .then(project => res.status(200).json(project))
    .catch(_err =>
      res.status(500).json({ errorMessage: "Error fetching project" })
    );
});

router.get("/:id/actions", validateProjectId, (req, res) => {
  const id = req.params.id;

  Projects.getProjectActions(id)
    .then(actions => res.status(200).json(actions))
    .catch(_err =>
      res.status(500).json({ errorMessage: "Error fetching project" })
    );
});

router.post("/", (req, res) => {
  const { name, description } = req.body;
  const { completed } = req.body || false;

  if (!name || !description) {
    res.status(400).json({ error: "Project needs a name and description" });
  }

  const project = {
    name: name,
    description: description,
    completed: completed
  };

  Projects.insert(project)
    .then(project => res.status(201).json(project))
    .catch(_err =>
      res.status(500).json({ errorMessage: "Error adding project" })
    );
});

router.put("/:id", validateProjectId, (req, res) => {
  const { name, description } = req.body;
  const { completed } = req.body || false;
  const id = req.params.id;

  if (!name) {
    res.status(400).json({ error: "Request needs name" });
  }
  if (!description) {
    res.status(400).json({ error: "Request needs description" });
  }

  Projects.update(id, {
    name: name,
    description: description,
    completed: completed
  })
    .then(project => res.status(201).json(project))
    .catch(_err =>
      res.status(500).json({ errorMessage: "Error updating project" })
    );
});

router.delete("/:id", validateProjectId, (req, res) => {
  const id = req.params.id;

  Projects.remove(id)
    .then(project => {
      if (project > 0) {
        res.status(200).json({ message: "Deleted project" });
      } else {
        res.status(400).json({ error: "Project could not be deleted" });
      }
    })
    .catch(_err =>
      res.status(500).json({ errorMessage: "Error deleting project" })
    );
});

function validateProjectId(req, res, next) {
  const id = req.params.id;

  if (!id) {
    res.status(400).json({ error: "Request needs a project id parameter" });
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

module.exports = router;
