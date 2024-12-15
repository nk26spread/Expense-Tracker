const addTransction = document.getElementById("add-expense");

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

addTransction.addEventListener("click", (e) => {
  e.preventDefault();

  const spendingAmountInput = document.getElementById("spending-amount");
  const selectedCategoryInput = document.getElementById("dropdown");
  const transctionBox = document.getElementById("expense-list");

  const spendingAmount = spendingAmountInput.value;
  const selectedCategory = selectedCategoryInput.value;

  const validCategories = [
    "Housing",
    "Utilities",
    "Transportation",
    "Food",
    "Health Care",
    "Debt Payment",
    "Investment",
    "Education",
    "Clothing",
    "Personal Care",
    "Gift & Donation",
    "Micellaneous",
  ];

  if (!validCategories.includes(selectedCategory)) {
    alert("Please select a valid category");
    return;
  }

  let transctionsData = new SpendingData(spendingAmount, selectedCategory);
  console.log(transctionsData);

  let li = document.createElement("li");
  li.setAttribute("class", "expense-card");
  li.innerHTML = `
                <div class="expense-card-title">
                  <h4>${transctionsData.category}</h4>
                  <p>${new Date().toLocaleString()}</p>
                </div>
                <div class="expense-card-amount">
                  <strong>₹${transctionsData.amount}</strong>
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

  spendingAmountInput.value = "";
  selectedCategoryInput.value = "";
});

// Function to generate random color
function randomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}



let income = document.getElementById("income")
let spend = document.getElementById("expenses")
let saving = document.getElementById("saving")

const incomeAmount =  parseInt(prompt("enter your INCOME AMOUNT ?"))
income.textContent = `₹${incomeAmount}`