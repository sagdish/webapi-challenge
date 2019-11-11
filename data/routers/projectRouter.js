const router = require('express').Router();
const db = require('../helpers/projectModel');

router.route('/')
  .get((req, res) => {
    db.get()
      .then(projects => {
        res.status(200).json(projects);
      })
      .catch(err => res.status(500).json(err));
  })
  .post((req, res) => {

    /* new project object properties:
    {
      name,
      description,
      completed
    } */

    const newProject = req.body;
    if (!newProject.description || !newProject.name) {
      console.log('please provide description and name of your project');
      res.status(404).json('you messed up!')
    }
    db.insert(newProject)
      .then(project => {
        res.status(201).json({message: `new project created`, project});
      })
      .catch(err => res.status(500).json(err));
  });


router.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    db.get(id)
      .then(project => {
        if (!project) {
          res.status(404).json({message: "project with specified id does not exitst"})
        } else {
          res.status(200).json(project)
        }
      })
      .catch(err => res.status(500).json(err));
  })
  .put((req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db.update(id, changes)
      .then(updated => {
        if (!updated) {
          res.status(404).json({message: "project with specified id does not exitst"})
        } else {
          res.status(200).json(updated);
        }
      })
      .catch(err => res.status(500).json(err));
  })
  .delete((req, res) => {
    const { id } = req.params;
    // variable to store post for deletion
    let projectToDelete;

    db.get(id)
      .then(toDelete => {
        if (!toDelete) {
          res.status(404).json({message: "project with specified id does not exist"})
        } else {
          projectToDelete = toDelete;
          db.remove(id)
          .then(response => {
            res.status(200).json({deleted: projectToDelete, response})
          })
          .catch(err => res.status(500).json(err));
        }
      })
      .catch(err => res.status(500).json(err));
  });

router.get('/:id/actions', (req, res) => {
  const { id } = req.params;

  db.getProjectActions(id)
    .then(actions => {
      if(!actions.length) {
        res.status(404).json({message: "no actions with this project"})
      } else {
        res.status(200).json(actions);
      }
    })
    .catch(err => res.status(500).json(err));
});

module.exports = router;