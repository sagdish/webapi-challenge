const router = require('express').Router();
const db = require('../helpers/actionModel');

router.route('/')
  .get((req, res) => {
    db.get()
      .then(actions => {
        res.status(200).json(actions);
      })
      .catch(err => res.status(500).json(err));
  })
  .post((req, res) => {

    /* new action object properties:
    {
      project_id,
      description,
      notes,
      completed
    } */

    const newAction = req.body;
    if (!newAction.description || !newAction.notes || !newAction.project_id) {
      console.log('please provide description, notes or id of existing project');
      res.status(404).json('you messed up!')
    }
    db.insert(newAction)
      .then(action => {
        res.status(201).json({message: `new action created`, action});
      })
      .catch(err => res.status(500).json(err));
  });


router.route('/:id')
  .get((req, res) => {
    const { id } = req.params;
    db.get(id)
      .then(action => {
        if (!action) {
          res.status(404).json({message: "action with specified id does not exitst"})
        } else {
          res.status(200).json(action)
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
          res.status(404).json({message: "action with specified id does not exitst"})
        } else {
          res.status(200).json(updated);
        }
      })
      .catch(err => res.status(500).json(err));
  })
  .delete((req, res) => {
    const { id } = req.params;
    // variable to store post for deletion
    let actionToDelete;

    db.get(id)
      .then(toDelete => {
        if (!toDelete) {
          res.status(404).json({message: "action with specified id does not exitst"})
        } else {
          actionToDelete = toDelete;
          db.remove(id)
          .then(response => {
            res.status(200).json({deleted: actionToDelete, response})
          })
          .catch(err => res.status(500).json(err));
        }
      })
      .catch(err => res.status(500).json(err));
  });

module.exports = router;