// Grab the DOM elements

const taskInput = document.getElementById('task')
const priceInput = document.getElementById('price')
const quantityInput = document.getElementById('quantity')
const addTaskButton = document.getElementById('add-task-btn')
const tasksContainerDiv = document.getElementById('tasks-container')
const removeButton = document.getElementById('remove-btn')
const taskQuantityDiv = document.getElementById('task-quantity')
const taskTotalsDiv = document.getElementById('task-totals')
const totalAmountDiv = document.getElementById('total-amount')
const sendInvoiceButton = document.getElementById('send-invoice-btn')

// Event Listeners
addTaskButton.addEventListener('click', addTask)
tasksContainerDiv.addEventListener('click', handleTaskEvents)
sendInvoiceButton.addEventListener('click', sendInvoice)

function handleTaskEvents(event) {
    // Identify the closest parent task section from the clicked element
    const taskSection = event.target.closest('.task-list');

    let targetElement = event.target

    // Check if the target is the FontAwesome icon and set the target to its parent button if so
    if (targetElement.classList.contains('fas')) {
        targetElement = targetElement.parentElement
    }
    
    // Check if the clicked element is the "remove" button
    if (event.target.classList.contains('remove-btn')) {
        // If so, call the removeTask function to delete the task
        removeTask(targetElement);
    } 
    // Check if the clicked element is the "plus" button
    else if (targetElement.classList.contains('plus-btn')) {
        // If so, call the updateQuantity function to increase the quantity by 1
        updateQuantity(taskSection, 1);
    } 
    // Check if the clicked element is the "minus" button
    else if (targetElement.classList.contains('minus-btn')) {
        // If so, call the updateQuantity function to decrease the quantity by 1
        updateQuantity(taskSection, -1);
    }
}

function addTask() {
    if (taskInput.value.trim() && Number(priceInput.value) > 0 && Number(quantityInput.value) > 0) {
        // Create the HTML structure for the task details
        const htmlString = `
            <section class="task-list">
                <div class="task-details">
                    <p class="task-names">${taskInput.value.trim()}</p>
                    <button id="remove-btn" class="remove-btn">remove</button>
                </div>
                <div class="task-quantity">
                    <button class="minus-btn">${quantityInput.value === '1' ? '<i class="fas fa-trash"></i>' : '-'}</button>
                    <p class="quantity">${quantityInput.value}</p>
                    <button class="plus-btn">+</button>
                </div>
                <div class="task-totals">
                    <p class="total" data-price="${priceInput.value}"><span>$</span>${Number(priceInput.value) * Number(quantityInput.value)}</p>
                </div>
            </section>
        `
        // Append the new task to the task details section
        tasksContainerDiv.insertAdjacentHTML('beforeend', htmlString)

        // Clear the input fields
        taskInput.value = ''
        priceInput.value = ''
        quantityInput.value = ''
    }
    updateTotalAmount()
}

function removeTask(buttonElement) {
    // Remove the closest task-list section to the clicked button
    buttonElement.closest('.task-list').remove()

    // Update the total amount
    updateTotalAmount()
}

function updateQuantity(taskElement, delta) {
    // Navigate up to the parent task section from the button
    const taskSection = taskElement.closest('.task-list')

    // Grab the quantity and total elements
    const quantityElement = taskSection.querySelector('.quantity')
    const totalElement = taskSection.querySelector('.total')
    
    // Get the item's price from the data-price attribute on the total element
    const itemPrice = Number(totalElement.getAttribute('data-price'))

    // Calculate the new quantity
    let newQuantity = Number(quantityElement.textContent) + delta;

    // If the new quantity is below 0, remove the task and exit the function
    if (newQuantity <= 0) {
        removeTask(taskElement);
        return;
    }

    // Update the displayed quantity
    quantityElement.textContent = newQuantity

    // Get the minus button
    const minusBtn = taskSection.querySelector('.minus-btn');

    // Check if new quantity is 1 and update the button content accordingly
    if (newQuantity === 1) {
        minusBtn.innerHTML = '<i class="fas fa-trash"></i>';
    } else {
        minusBtn.textContent = '-';
    }

    // Update the total for this item
    totalElement.textContent = `$${itemPrice * newQuantity}`

    // Update the overall total amount
    updateTotalAmount()
}

function sendInvoice() {
    // Remove all tasks from the task list
    while(tasksContainerDiv.firstChild) {
        tasksContainerDiv.removeChild(tasksContainerDiv.firstChild);
    }

    // Update the total amount to reflect the empty task list
    updateTotalAmount();
}

// Utility Functions
function updateTotalAmount() {
    // Variable to hold the sum of all the 'total' elements
    let totalAmount = 0;

    // Grab all the 'total' elements
    const totalElements = document.querySelectorAll('.total');

    // Loop through each 'total' element and add its value to the totalAmount variable
    totalElements.forEach(function (totalElement) {
        // Remove the dollar sign before converting to a number
        const numericValue = Number(totalElement.textContent.replace('$', ''));
        totalAmount += numericValue;
    });

    // Update the total amount with the dollar sign
    totalAmountDiv.textContent = `$${totalAmount}`;
}

