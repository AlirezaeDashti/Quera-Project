const taskCreatBtn = document.querySelector(".task-creat-btn");
const todoCreatTitle = document.querySelector(".todo-creat-title");
const todoCreatDesc = document.querySelector(".todo-creat-desc");
const prioritySelectBtn = document.querySelector(".priority-select-btn");
const prioritySelectBtnSvg = document.querySelector(".priority-select-btn svg");
const priorityList = document.querySelector(".priority-list");
const priorities = document.querySelectorAll("input[name = 'priority']");
const inprogressTasksContainer = document.querySelector(".inprogress-tasks-container");

const TaskCreatBtnHandler = () => {
    console.log(todoCreatTitle.value, todoCreatDesc.value);
    let userSelectedPriority;
    for (let i = 0; i < priorities.length; i++) {
        if (priorities[i].checked) {
            userSelectedPriority = priorities[i].value;
        }  
    } 

    const newTask = {
        title: todoCreatTitle.value,
        desc: todoCreatDesc.value,
        priority: userSelectedPriority,
    }
   
    const lastInProgressTasks = JSON.parse(localStorage.getItem("inProgressTasks"));
    lastInProgressTasks.push(newTask);

    localStorage.setItem("inProgressTasks" , JSON.stringify(lastInProgressTasks));
};

const PrioritySelectBtnHAndler = () => {
    priorityList.classList.toggle("show");
    prioritySelectBtnSvg.classList.toggle("rotate-90");
    if (!priorityList.classList.contains("show")) {
        for (let i = 0; i < priorities.length; i++) {
            priorities[i].checked = false;
        }
    }
};

const DOMContentLoadedHandler = () => {
    const getInProgressTasks= JSON.parse(localStorage.getItem("inProgressTasks"));
    console.log(getInProgressTasks);
    getInProgressTasks.forEach((task) => {
        const taskBox = document.createElement("div");
        taskBox.classList.add("inprogress-tasks");
        if (task.priority == 'low') {
            taskBox.innerHTML = `
            <h2>${task.title}</h2>
            <span style='background-color:green'>${task.priority}</span>
            <p>${task.desc}</P>
        `;
        }
        else if (task.priority == 'mid') {
            taskBox.innerHTML = `
            <h2>${task.title}</h2>
            <span style='background-color:orange'>${task.priority}</span>
            <p>${task.desc}</P>
        `;
        }
        else if (task.priority == 'high') {
            taskBox.innerHTML = `
            <h2>${task.title}</h2>
            <span style='background-color:red'>${task.priority}</span>
            <p>${task.desc}</P>
        `;
        }
        inprogressTasksContainer.appendChild(taskBox);
        
});
}

taskCreatBtn.addEventListener("click", TaskCreatBtnHandler);
prioritySelectBtn,addEventListener("click", PrioritySelectBtnHAndler);
document.addEventListener("DOMContentLoaded", DOMContentLoadedHandler);

