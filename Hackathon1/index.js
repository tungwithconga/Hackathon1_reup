"use strict";
class TodoList {
    constructor(todoList) {
        this.todoList = todoList;
    }
    renderJob() {
        const todoListDiv = document.getElementById('todo-list');
        todoListDiv.innerHTML = 'x';
        this.todoList.forEach(task => {
            const taskDiv = document.createElement('div');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => this.updateJob(task.id, checkbox.checked));
            const span = document.createElement('span');
            span.textContent = task.name;
            if (task.completed) {
                span.classList.add('completed');
            }
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Sửa';
            editBtn.addEventListener('click', () => this.editJob(task.id));
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Xóa';
            deleteBtn.addEventListener('click', () => this.deleteJob(task.id));
            taskDiv.appendChild(checkbox);
            taskDiv.appendChild(span);
            taskDiv.appendChild(editBtn);
            taskDiv.appendChild(deleteBtn);
            todoListDiv.appendChild(taskDiv);
        });
    }
    createJob(newTaskName) {
        const existingTask = this.todoList.find(task => task.name === newTaskName);
        if (existingTask) {
            alert('Tác vụ đã tồn tại!');
            return;
        }
        const newTask = {
            id: this.todoList.length + 1,
            name: newTaskName,
            completed: false
        };
        this.todoList.push(newTask);
        this.saveToLocalStorage();
        this.renderJob();
    }
    updateJob(taskId, completed) {
        const taskIndex = this.todoList.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            this.todoList[taskIndex].completed = completed;
            this.saveToLocalStorage();
            this.renderJob();
        }
    }
    editJob(taskId) {
        const newName = prompt('Nhập tên nhiệm vụ mới:');
        if (newName !== null) {
            const taskIndex = this.todoList.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                this.todoList[taskIndex].name = newName.trim();
                this.saveToLocalStorage();
                this.renderJob();
            }
        }
    }
    deleteJob(taskId) {
        const confirmed = confirm('Bạn có chắc chắn muốn xóa tác vụ này không?');
        if (confirmed) {
            this.todoList = this.todoList.filter(task => task.id !== taskId);
            this.saveToLocalStorage();
            this.renderJob();
        }
    }
    deleteAllTasks() {
        const confirmed = confirm('Bạn có chắc chắn muốn xóa tất cả nhiệm vụ không?');
        if (confirmed) {
            localStorage.removeItem('todoList');
            this.todoList = [];
            this.renderJob();
        }
    }
    saveToLocalStorage() {
        localStorage.setItem('todoList', JSON.stringify(this.todoList));
    }
    loadFromLocalStorage() {
        const savedData = localStorage.getItem('todoList');
        if (savedData) {
            this.todoList = JSON.parse(savedData);
        }
        else {
            this.todoList = [];
        }
    }
}
const todoList = new TodoList([]);
todoList.loadFromLocalStorage();
todoList.renderJob();
function addTask() {
    const newTaskInput = document.getElementById('new-task');
    const newTaskName = newTaskInput.value.trim();
    if (newTaskName === '') {
        alert('Tên nhiệm vụ không được để trống!');
        return;
    }
    todoList.createJob(newTaskName);
    newTaskInput.value = '';
}
function deleteJob(taskId) {
    todoList.deleteJob(taskId);
}
function deleteAllTasks() {
    todoList.deleteAllTasks();
}
function updateJob(taskId, completed) {
    todoList.updateJob(taskId, completed);
}
function editJob(taskId) {
    todoList.editJob(taskId);
}
