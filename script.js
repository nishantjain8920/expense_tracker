let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateValues() {
  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
  const income = amounts.filter(i => i > 0).reduce((acc, item) => acc + item, 0).toFixed(2);
  const expense = (
    amounts.filter(i => i < 0).reduce((acc, item) => acc + item, 0) * -1
  ).toFixed(2);
  document.getElementById("balance").innerText = `₹${total}`;
  document.getElementById("income").innerText = `+₹${income}`;
  document.getElementById("expense").innerText = `-₹${expense}`;
}
function addTransaction() {
  const text = document.getElementById("text").value;
  const amount = +document.getElementById("amount").value;
  if (text.trim() === "" || isNaN(amount)) {
    alert("Please enter valid details");
    return;
  }
  const transaction = { id: Date.now(), text, amount };
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  addTransactionDOM(transaction);
  updateValues();
  document.getElementById("text").value = "";
  document.getElementById("amount").value = "";
}
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const li = document.createElement("li");
  li.classList.add(transaction.amount < 0 ? "minus" : "plus");
  li.innerHTML = `
    ${transaction.text} <span>${sign}₹${Math.abs(transaction.amount)}</span>
    <button onclick="removeTransaction(${transaction.id})">delete</button>
  `;
  document.getElementById("list").appendChild(li);
}
function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  init();
}
function init() {
  document.getElementById("list").innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}
init();
