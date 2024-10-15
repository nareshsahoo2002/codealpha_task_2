let expenses = JSON.parse(localStorage.getItem('expenses')) || []; // Retrieve expenses from local storage
let totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0); // Calculate the total amount from stored expenses

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expnese-table-body');
const totalAmountCell = document.getElementById('total-amount');

// Display existing expenses when the page loads
for (const expense of expenses) {
    addExpenseToTable(expense);
}

totalAmountCell.textContent = totalAmount; // Display the total amount

addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    const newExpense = { category, amount, date };
    expenses.push(newExpense);
    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    // Store the updated expenses in local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));

    addExpenseToTable(newExpense);
});

function addExpenseToTable(expense) {
    const newRow = expensesTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        expenses.splice(expenses.indexOf(expense), 1); // Remove expense from the array

        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;

        // Update local storage after deletion
        localStorage.setItem('expenses', JSON.stringify(expenses));

        expensesTableBody.removeChild(newRow); // Remove the row from the table
    });

    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);
}