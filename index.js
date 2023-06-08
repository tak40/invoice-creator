import { taskData } from './data.js';

const taskList = document.getElementById('task-selection-section');

let totalPrice = 0;
let selectedTasks = [];

// This function generates and displays task buttons using task data.
function renderTasks() {
    let taskBtnHtml = '';
    for (let task of taskData) {
        taskBtnHtml += `
        <div class="task-btn-container">
            <button class="task-btn" id="task-btn-${task.id}">${task.taskName}: $${task.price}</button>
        </div>
        `
    }
    taskList.innerHTML = taskBtnHtml;
    // Now we add an event listener to each button. This will execute a function when a button is clicked.
    for (let task of taskData) {
        const taskBtn = document.getElementById(`task-btn-${task.id}`);
        taskBtn.addEventListener('click', taskBtnClick);
    }
}

// This function is executed when a task button is clicked.
function taskBtnClick(e) {
    let taskId = e.target.id.split('-')[2];
    let task = taskData.find(task => task.id == taskId);
    addTaskToList(task, e.target);
}

// This function adds a task to selected tasks and disables its button.
function addTaskToList(task, taskBtn) {
    if (!selectedTasks.includes(task)) {
        selectedTasks.push(task);
        displaySelectedTask(task.taskName, task.price);
        totalPrice += task.price;
        displayNotesAndTotalAmount();
        taskBtn.disabled = true;
    }
}

// This function displays a selected task in the task list.
function displaySelectedTask(taskName, taskPrice) {
    const namesSection = document.getElementById('task-names');
    const pricesSection = document.getElementById('task-prices');
    const newTaskNameParagraph = document.createElement('p');
    const newTaskNameSpan = document.createElement('span');

    newTaskNameSpan.classList.add('task-name-style');
    newTaskNameSpan.textContent = taskName;

    newTaskNameParagraph.appendChild(newTaskNameSpan);
    namesSection.appendChild(newTaskNameParagraph);

    const newTaskPriceParagraph = document.createElement('p');
    const dollarSignSpan = document.createElement('span');
    dollarSignSpan.classList.add('dollar-sign-style');
    dollarSignSpan.textContent = "$";
    newTaskPriceParagraph.appendChild(dollarSignSpan);

    const newTaskPriceSpan = document.createElement('span');
    newTaskPriceSpan.classList.add('task-price-style'); 
    newTaskPriceSpan.textContent = taskPrice;
    newTaskPriceParagraph.appendChild(newTaskPriceSpan);
    pricesSection.appendChild(newTaskPriceParagraph); 
}

// This function displays notes and total amount.
function displayNotesAndTotalAmount(taskName, taskPrice) {
    const notesSection = document.getElementById('notes');
    const totalAmountSection = document.getElementById('total-amount');
    if (!notesSection.hasChildNodes()) {
        const newNotesParagraph = document.createElement('p');
        newNotesParagraph.textContent = `We accept cash, credit card, or PayPal`;
        notesSection.appendChild(newNotesParagraph);
    }
    
    const totalAmountParagraph = document.createElement('p');
    totalAmountParagraph.classList.add('total-amount-paragraph');
    totalAmountParagraph.textContent = `$${totalPrice}`;

    totalAmountSection.innerHTML = '';
    totalAmountSection.appendChild(totalAmountParagraph); 
}

// This function resets everything when invoice button is clicked.
document.getElementById('invoice-btn').addEventListener('click', function() {
    selectedTasks = [];
    totalPrice = 0;

    // We clear the displayed tasks, notes and total amount.
    document.getElementById('task-names').innerHTML = '';
    document.getElementById('task-prices').innerHTML = '';
    document.getElementById('notes').innerHTML = '';
    document.getElementById('total-amount').innerHTML = '$0';

    // We enable all task buttons again.
    for (let task of taskData) {
        const taskBtn = document.getElementById(`task-btn-${task.id}`);
        taskBtn.disabled = false;
    }
});

// We display task buttons as soon as script is loaded.
renderTasks(taskData);