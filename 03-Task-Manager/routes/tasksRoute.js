

//
//post '/' createTask => adds a new task in the list 
//get '/' getTasks => returns all tasks
//delete '/:id' deleteTasks => removes a task
//delete '/' clearTasks => removes all tasls
//put '/:id' editTask => edits a task
//get '/:id' getTask => returns one task
// 

const express = require('express');
const router = express.Router();
const { getTask, getTasks, deleteTask, clearTasks, editTask, createTask} = require('../controllers/tasksCon');


router.route('/')   
    .get(getTasks)
    .post(createTask)
    .delete(clearTasks)
router.route('/:id')
    .delete(deleteTask)
    .put(editTask)
    .get(getTask)

module.exports = router;