//
//post '/' createTask => adds a new task in the list
//get '/' getTasks => returns all tasks
//delete '/:id' deleteTasks => removes a task
//delete '/' clearTasks => removes all tasls
//put '/:id' editTask => edits a task
//get '/:id' getTask => returns one task
//

const Task = require("../models/Task");

const getTasks = async (req, res) => {
  //find is a query
  //queries return the thing you are looking for
  const tasks = await Task.find({});
  //this is returned to the user as a json to be used with the data
  res.send({ method: req.method, tasks: tasks });
};
const createTask = async (req, res) => {
  //task.create is a method that adds the template object to the database
  //create is a METHOD, not a query
  const task = await Task.create(req.body);
  //response is just what the dev sees in the response. has nothing to do with it being created and even if deleted ^ will work
  res.json({ method: req.method, task: task, body: req.body });
};
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.deleteOne({ _id: id });
    res.json({ method: req.method, task, id: req.params });
  } catch (err) {
    res.json({ msg: err });
  }
};
const clearTasks = async (req, res) => {
  const tasks = await Task.deleteMany({});
  res.json({ method: req.method, tasks });
};
const getTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task) {
      res.json({ msg: `no items with id: ${id}` });
    }
    res.json({ method: req.method, task, id: req.params });
  } catch {
    res.json({ msg: `no items with id: ${id}` });
  }
};
const editTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndUpdate(id, req.body, {
      //new: true => task will equal the NEW task
      new: true,
      //runValidaters checks the new task against the model we created
      runValidators: true,
    });

    if(!task){
        return res.json({msg: `no task with id: ${id}`})
    }
    
    res.json({
        method: req.method,
        task: "editTask",
        id: req.params,
        body: req.body,
      });
  } catch(err) {
      res.json({msg: err})
  }

  
};

module.exports = {
  getTasks,
  createTask,
  deleteTask,
  clearTasks,
  getTask,
  editTask,
};
