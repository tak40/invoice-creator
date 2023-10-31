// ===================
// DOM ELEMENTS SETUP
// ===================

// Main task and invoice related elements
const taskInput = document.getElementById("task")
const priceInput = document.getElementById("price")
const quantityInput = document.getElementById("quantity")
const addTaskButton = document.getElementById("add-task-btn")
const taskEntryForm = document.getElementById("task-entry-form")
const tasksContainerDiv = document.getElementById("tasks-container")
const removeButton = document.getElementById("remove-btn")
const taskQuantityDiv = document.getElementById("task-quantity")
const taskTotalsDiv = document.getElementById("task-totals")
const totalAmountDiv = document.getElementById("total-amount")
const sendInvoiceButton = document.getElementById("send-invoice-btn")

// Modal related elements
const invoiceModal = document.getElementById("invoice-modal")
const submitModalBtn = document.getElementById("submit-modal-btn")
const cancelModalBtn = document.getElementById("cancel-modal-btn")
const confirmationModal = document.getElementById("confirmation-modal")
const closeConfirmModalBtn = document.getElementById("close-confirm-modal-btn")

// ==============
// EVENT LISTENERS
// ==============

addTaskButton.addEventListener("click", addTask)
tasksContainerDiv.addEventListener("click", handleTaskEvents)
sendInvoiceButton.addEventListener("click", handleSendInvoice)
taskEntryForm.addEventListener("submit", handleTaskEntry)

// Modal Event Listeners
submitModalBtn.addEventListener("click", processInvoice)
cancelModalBtn.addEventListener("click", () => invoiceModal.close())
closeConfirmModalBtn.addEventListener("click", () => confirmationModal.close())

// =======================
// TASK RELATED FUNCTIONS
// =======================

// Handle various button events
function handleTaskEvents(event) {
    // Identify the closest parent task section from the clicked element
    const taskSection = event.target.closest(".task-list")

    let targetElement = event.target

    // Check if the target is the FontAwesome icon and set the target to its parent button if so
    if (targetElement.classList.contains("fas")) {
        targetElement = targetElement.parentElement
    }

    // Check if the clicked element is the "remove" button
    if (event.target.classList.contains("remove-btn")) {
        // If so, call the removeTask function to delete the task
        removeTask(targetElement)
    }
    // Check if the clicked element is the "plus" button
    else if (targetElement.classList.contains("plus-btn")) {
        // If so, call the updateQuantity function to increase the quantity by 1
        updateQuantity(taskSection, 1)
    }
    // Check if the clicked element is the "minus" button
    else if (targetElement.classList.contains("minus-btn")) {
        // If so, call the updateQuantity function to decrease the quantity by 1
        updateQuantity(taskSection, -1)
    }
}

// Add a new task to the list
function addTask() {
    // Check for valid inputs
    if (
        taskInput.value.trim() &&
        Number(priceInput.value) > 0 &&
        Number(quantityInput.value) > 0
    ) {
        // Calculate the total for the task and format it to two decimal places
        const totalForTask = (
            Number(priceInput.value) * Number(quantityInput.value)
        ).toFixed(2)

        // Create the HTML structure for the task details
        const htmlString = `
            <section class="task-list">
                <p class="task-names">${taskInput.value.trim()}</p>
                <button id="remove-btn" class="remove-btn">remove</button>
                <div class="task-quantity">
                    <button class="minus-btn">${
                        quantityInput.value === "1"
                            ? '<i class="fas fa-trash"></i>'
                            : "-"
                    }</button>
                    <p class="quantity">${quantityInput.value}</p>
                    <button class="plus-btn">+</button>
                </div>
                <div class="task-totals">
                    <p class="total" data-price="${
                        priceInput.value
                    }"><span>$</span>${totalForTask}</p>
                </div>
            </section>
        `
        // Append the new task to the task details section
        tasksContainerDiv.insertAdjacentHTML("beforeend", htmlString)

        // Clear the input fields
        taskInput.value = ""
        priceInput.value = ""
        quantityInput.value = ""
    } else {
        alert("Please enter a valid task, price, and quantity")
    }
    updateTotalAmount()
}

// Handle the form submission 
function handleTaskEntry(event) {
    event.preventDefault()
    addTask()
}

// Remove a task entry
function removeTask(buttonElement) {
    // Remove the closest task-list section to the clicked button
    buttonElement.closest(".task-list").remove()

    updateTotalAmount()
}

// Update quantity of a task and its total price
function updateQuantity(taskElement, delta) {
    // Navigate up to the parent task section from the button
    const taskSection = taskElement.closest(".task-list")

    const quantityElement = taskSection.querySelector(".quantity")
    const totalElement = taskSection.querySelector(".total")

    // Get the item's price from the data-price attribute on the total element
    const itemPrice = Number(totalElement.getAttribute("data-price"))

    // Calculate the new quantity
    let newQuantity = Number(quantityElement.textContent) + delta

    // If the new quantity is below 0, remove the task and exit the function
    if (newQuantity <= 0) {
        removeTask(taskElement)
        return
    }

    // Update the displayed quantity
    quantityElement.textContent = newQuantity

    const minusBtn = taskSection.querySelector(".minus-btn")

    // Check if new quantity is 1 and update the button content accordingly
    if (newQuantity === 1) {
        minusBtn.innerHTML = '<i class="fas fa-trash"></i>'
    } else {
        minusBtn.textContent = "-"
    }

    // Update the total for this item
    totalElement.textContent = `$${(itemPrice * newQuantity).toFixed(2)}`

    updateTotalAmount()
}

// Calculate and display the total amount for all tasks
function updateTotalAmount() {
    // Variable to hold the sum of all the 'total' elements
    let totalAmount = 0

    const totalElements = document.querySelectorAll(".total")

    // Loop through each 'total' element and add its value to the totalAmount variable
    totalElements.forEach(function (totalElement) {
        // Remove the dollar sign before converting to a number
        const numericValue = Number(totalElement.textContent.replace("$", ""))
        totalAmount += numericValue
    })

    // Update the total amount with the dollar sign
    totalAmountDiv.textContent = `$${totalAmount.toFixed(2)}`
}

// ======================
// MODAL RELATED FUNCTIONS
// ======================

// Handle sending the invoice
function handleSendInvoice() {
    // Check if any tasks are present
    const tasks = tasksContainerDiv.querySelectorAll(".task-list")
    if (tasks.length > 0) {
        // Show the invoice modal if tasks are present
        invoiceModal.showModal()
    } else {
        alert("Please add tasks before sending an invoice.")
    }
}

// Clear all tasks from the list
function clearAllTasks() {
    // Remove all tasks from the task list
    while (tasksContainerDiv.firstChild) {
        tasksContainerDiv.removeChild(tasksContainerDiv.firstChild)
    }
    updateTotalAmount()
}

// Handle the invoice submission process
function processInvoice() {
    // Grab the values from the email and message fields in the modal
    const emailValue = document.getElementById("email").value.trim()
    const messageValue = document.getElementById("message").value.trim()

    // Check if the values are not empty
    if (emailValue && messageValue) {
        // Clear all tasks, close the invoice modal and show the confirmation message
        clearAllTasks()
        invoiceModal.close()
        confirmationModal.showModal()
    } else {
        alert("Please ensure the email and message fields are filled out.")
    }
}

// Helper function for closing modals on outside click or specific button click
function closeDialogOnClickOutside(dialog, cancelBtnId) {
    dialog.addEventListener("click", (e) => {
        const dialogDimensions = dialog.getBoundingClientRect()
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom ||
            e.target.id === cancelBtnId
        ) {
            dialog.close()
        }
    })
}

// Close modals on clicking outside
closeDialogOnClickOutside(invoiceModal, "cancel-modal-btn")
closeDialogOnClickOutside(confirmationModal, "close-confirm-modal-btn")
