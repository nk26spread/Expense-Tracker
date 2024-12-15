const addTransactionButton = document.getElementById("add-expense");
const spendingAmountInput = document.getElementById("spending-amount");
const selectedCategoryInput = document.getElementById("dropdown");
const transctionBox = document.getElementById("expense-list");

// Arrays to store dynamic data for the chart
const categories = [];
const amounts = [];
const backgroundColors = []; // Colors for bars

// Create the Chart.js bar chart
const ctx = document.getElementById("myChart").getContext("2d");
const expenseChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: categories, // Categories for the X-axis
    datasets: [
      {
        label: "Expenses",
        data: amounts, // Amounts for the Y-axis
        backgroundColor: backgroundColors, // Colors for bars
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount (₹)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Categories",
        },
      },
    },
  },
});

function SpendingData(amount, category) {
  this.amount = amount;
  this.category = category;
}

// Function to handle the transaction update
function handleTransactionUpdate() {
  const spendingAmount = spendingAmountInput.value;
  const selectedCategory = selectedCategoryInput.value;

  if (!spendingAmount || !selectedCategory) {
    alert("Please enter both amount and category");
    return;
  }

  let transactionData = new SpendingData(spendingAmount, selectedCategory);

  // Add to expense list
  let li = document.createElement("li");
  li.setAttribute("class", "expense-card");
  li.innerHTML = `
                <div class="expense-card-title">
                  <h4>${transactionData.category}</h4>
                  <p>${new Date().toLocaleString()}</p>
                </div>
                <div class="expense-card-amount">
                  <strong>₹${transactionData.amount}</strong>
                </div>`;
  transctionBox.appendChild(li);

  // Update chart data
  if (categories.includes(selectedCategory)) {
    // Update the amount if the category already exists
    const index = categories.indexOf(selectedCategory);
    amounts[index] += parseFloat(spendingAmount);
  } else {
    // Add new category and amount
    categories.push(selectedCategory);
    amounts.push(parseFloat(spendingAmount));
    backgroundColors.push(randomColor()); // Assign a random color for the bar
  }

  // Update the chart
  expenseChart.update();

  // Clear input fields after adding the transaction
  spendingAmountInput.value = "";
  selectedCategoryInput.value = "";
}

// Function to generate random color
function randomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Event listener for button click
addTransactionButton.addEventListener("click", (e) => {
  e.preventDefault();
  handleTransactionUpdate();
});

// Event listener for Enter key press in the input fields
const inputs = [spendingAmountInput, selectedCategoryInput];
inputs.forEach((input) => {
  input.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleTransactionUpdate();
    }
  });
});

// Update Income, Expenses, and Saving
let income = document.getElementById("income");
let spend = document.getElementById("expenses");
let save = document.getElementById("saving");

const incomeAmount = parseInt(prompt("Enter your INCOME AMOUNT?"));
income.textContent = `₹${incomeAmount}`;

// Calculate total spending
const calculateSpending = amounts.reduce((acc, money) => acc + money, 0);
spend.textContent = `₹${calculateSpending}`;

// Calculate saving
const calculateSaving = incomeAmount - calculateSpending;
save.textContent = `₹${calculateSaving}`;
