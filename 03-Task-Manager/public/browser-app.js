//define all the DOM elements

const tasksDOM = document.querySelector(".tasks");
const loadingDOM = document.querySelector(".loading-text");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

//load tasks from /api/v1/tasks
const showTasks = async () => {
  loadingDOM.style.visiblity = "visible";
  try {
    const {data: {tasks}} = await axios.get('/api/v1/tasks')
    if(tasks.length < 1){
        tasksDOM.innerHTML = `<h5 class='empty-list'>No tasks in your list </h5>`
        loadingDOM.style.visibility = 'hidden'
        return 
    }
    const allTasks = tasks.map((task) => {
        const {completed, _id: taskID, name} = task;
        return `<div class='single-task ${completed && 'task-completed'}'>
<h5><span><i class ='far fa-check-circle'></i></span>${name}</h5>
<div class='task-links'>

<!--edit link-->
<a href='task.html?id=${taskID}' class='edit-link'>
<i class='fas fa-edit'></i>
</a>

<!--delete btn-->
<button type='button' class='delete-btn' data-id='${taskID}'>
<i class='fas fa-trash'></i>
</button>
</div>
</div>
`
    }).join("")
    tasksDOM.innerHTML = allTasks

  } catch (err) {
    tasksDOM.innerHTML = `<h5 class='empty-list'> There was an error. Please try again... </h5>`
  }
  loadingDOM.style.visibility = 'hidden'
};

showTasks();

//delete task /api/v1/tasks/:id

tasksDOM.addEventListener("click", async(e) => {
    const target = e.target;
    if(target.parentElement.classList.contains('delete-btn')){
        loadingDOM.style.visibility = 'visible'
        const id = target.parentElement.dataset.id;
        try{
            await axios.delete(`/api/v1/tasks/${id}`);
            showTasks();
        } catch (err){
            console.error(err)
        }
    }
    loadingDOM.style.visibility = 'hidden'
})

//form

formDOM.addEventListener('submit', async(e) => {
    e.preventDefault();
    const name = taskInputDOM.value;
    try{
        await axios.post('/api/v1/tasks', {name});
        showTasks();
        taskInputDOM.value = ''
        formAlertDOM.style.display= 'block'
        formAlertDOM.textContents = 'success, task added';
        formAlertDOM.classList.add('text-success')
    }catch(err){
        formAlertDOM.style.display = 'block'
        formAlertDOM.innerHTML = 'error, please try again'
        console.error(err);
    }
    setTimeout(() => {
        formAlertDOM.style.display = 'none'
        formAlertDOM.classList.remove('text-success')
    }, 3000)
})
