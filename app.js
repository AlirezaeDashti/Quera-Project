const taskCreatBtn = document.querySelector(".task-creat-btn");
const todoCreatTitle = document.querySelector(".todo-creat-title");
const todoCreatDesc = document.querySelector(".todo-creat-desc");
const prioritySelectBtn = document.querySelector(".priority-select-btn");
const prioritySelectBtnSvg = document.querySelector(".priority-select-btn svg");
const priorityList = document.querySelector(".priority-list");
const priorities = document.querySelectorAll("input[name = 'priority']");
const inProgressTasksContainer = document.querySelector(".inprogress-tasks-container");

const GenerateInprogressTasks = (inProgressTasks) => {
    const taskBox = document.createElement("div");
    taskBox.classList.add("inprogress-tasks");
    
    if (inProgressTasks.priority == 'low') {
        taskBox.innerHTML = `
        <h2>${inProgressTasks.title}</h2>
        <span style='background-color:green'>${inProgressTasks.priority}</span>
        <p>${inProgressTasks.desc}</P>
    `;
    }
    else if (inProgressTasks.priority == 'mid') {
        taskBox.innerHTML = `
        <h2>${inProgressTasks.title}</h2>
        <span style='background-color:orange'>${inProgressTasks.priority}</span>
        <p>${inProgressTasks.desc}</P>
    `;
    }
    else if (inProgressTasks.priority == 'high') {
        taskBox.innerHTML = `
        <h2>${inProgressTasks.title}</h2>
        <span style='background-color:red'>${inProgressTasks.priority}</span>
        <p>${inProgressTasks.desc}</P>
    `;
    }
    inProgressTasksContainer.appendChild(taskBox);
}

const TaskCounter = () => {
    const taskCountsBox = document.createElement("div"); 
    taskCountsBox.classList.add("task-counter");
    const taskCounts = JSON.parse(localStorage.getItem("inProgressTasks")).length;
    taskCountsBox.innerHTML = `
        <p>${taskCounts} تسک را باید انجام دهید.</p>
    `;
    document.body.appendChild(taskCountsBox); 
}
const TaskCreatBtnHandler = () => {

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
    };

    if (localStorage.getItem("inProgressTasks") !== null) {
        const lastInProgressTasks = JSON.parse(localStorage.getItem("inProgressTasks"));
        lastInProgressTasks.push(newTask);
    
        localStorage.setItem("inProgressTasks" , JSON.stringify(lastInProgressTasks));
        GenerateInprogressTasks(newTask);
     }
    else {
        const firstInProgressTasks =[];
        firstInProgressTasks.push(newTask);
        localStorage.setItem(
            "inProgressTasks", JSON.stringify(firstInProgressTasks)
        );
    }  
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
        GenerateInprogressTasks(task);
});
TaskCounter();
}

taskCreatBtn.addEventListener("click", TaskCreatBtnHandler);
prioritySelectBtn.addEventListener("click", PrioritySelectBtnHAndler);
document.addEventListener("DOMContentLoaded", DOMContentLoadedHandler);

