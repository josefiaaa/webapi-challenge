const express = require('express');
const db = require('../data/helpers/projectModel');
const router = express.Router();

/////////// GET ALL PROJECTS \\\\\\\\\\\\\
router.get('/', (req, res) => {
    db.get()
    .then(db => {
        res.status(200).json(db);
    })
    .catch(err => {
        res.status(500).json({ err: "The projects could not be retrieved" })
    })
})

/////////// ADD PROJECT \\\\\\\\\\\\\
router.post('/', (req, res) => {
    const projInfo = req.body;

    !projInfo.name || !projInfo.description
    ?
        res.status(400).json({ errorMessage: "Please provide both a name and description for the project." })
    :
        db.insert(projInfo)
        .then(proj => {
            res.status(201).json(proj);
        })
    .catch( err => {
        res.status(500)({ error: "There was an error while saving this project to the database." })
    })
})

/////////// EDIT A PROJECT \\\\\\\\\\\\\
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    !changes.name || !changes.description
    ?
        res.status(400).json({ errorMessage: "Please provide a name and description for the project." })
    :
        db.update(id, changes)
        .then( id => {
            if(id === 0){
                res.status(404).json({ message: "The project with this specified ID does not exist." }) 
            }  else {
                res.json(project);
            }
        })
        .catch(err => {
            res.status(500).json({ message: "An error occured while locating the project."})
            })
    .catch(err => {
        res.status(500).json({ err: "The project information could not be modified." })
    })          
})

/////////// DELETE A PROJECT \\\\\\\\\\\\\
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
    .then(proj => {
        if (proj) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: "The project with this specified ID does not exist." });
        }
    })
    .catch(err => {
        res.status(500).json({ err: "The project could not be deleted." });
    })
})

/////////// GET PROJECT ACTIONS \\\\\\\\\\\\\
router.get('/:id/actions', (req, res) => {
    const id = req.params.id;
    db.getProjectActions(id)
    .then(db => {
        if (db === 0) {
        res.status(404).json({ message: "Unable to find."});
        } else {
            res.status(200).json(db)
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The project's actions could not be retrieved."})
    })
});


module.exports = router;