 
var taskList = document.querySelector('#tasks-list');

document.querySelector('#push').addEventListener('click', function() {
    if (document.querySelector('#newtask input').value.length == 0) {
        alert("Please Enter a Task");
    } else {
        addTaskHandler();
        document.querySelector('#newtask input').value = "";
    }
});

function addTaskHandler() {
    var newTaskInputValue = document.querySelector('#newtask input').value;
    var currentDateTime = document.querySelector('#datetime').value;

    var taskElement = document.createElement('div');
    taskElement.classList.add('task');

    var taskContent = `
        <div>
            <div class="custom-checkbox"></div>
            <span class="taskname">${newTaskInputValue}</span>
            <span class="task-date">${currentDateTime}</span>
        </div>
        <button class="delete">Del<i class="far fa-trash-alt"></i></button>
    `;

    taskElement.innerHTML = taskContent;
    taskList.appendChild(taskElement);

    var deleteButton = taskElement.querySelector(".delete");
    deleteButton.addEventListener('click', function() {
        taskElement.remove();
        removeTaskFromLocalStorage(newTaskInputValue, currentDateTime);
    });

    var checkbox = taskElement.querySelector(".custom-checkbox");
    checkbox.addEventListener('click', function() {
        taskElement.classList.toggle("task-completed");

        if (taskElement.classList.contains("task-completed")) {
            playCompletedSound();
            saveTaskToLocalStorage(newTaskInputValue, currentDateTime);
        }
    });
}

function saveTaskToLocalStorage(task, datetime) {
    var tasksForDate = JSON.parse(localStorage.getItem(datetime)) || [];
    tasksForDate.push(task);
    localStorage.setItem(datetime, JSON.stringify(tasksForDate));
}

function removeTaskFromLocalStorage(task, datetime) {
    var tasksForDate = JSON.parse(localStorage.getItem(datetime)) || [];
    var updatedTasks = tasksForDate.filter(t => t !== task);
    localStorage.setItem(datetime, JSON.stringify(updatedTasks));
}

function playCompletedSound() {
    var completedSound = new Audio('./sound.mp3');
    completedSound.play();
    var soundDuration = 1000;
    setTimeout(function() {
        completedSound.pause();
        completedSound.currentTime = 0;
    }, soundDuration);
}




 