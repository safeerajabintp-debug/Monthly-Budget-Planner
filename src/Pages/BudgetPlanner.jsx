import React from 'react'
import { WalletIcon, BanknotesIcon, ChartBarIcon, TrashIcon,PencilIcon} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import bg1Video from "/videos/bg1-video.mp4";

function BudgetPlanner() {
const [selectedMonth, setSelectedMonth] = useState("");
  const [budget, setBudget] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [data, setData] = useState({});
  const [editingId, setEditingId] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // 🔹 Load saved data when component mounts
  useEffect(() => {
    if (currentUser) {
      const savedData = JSON.parse(
        localStorage.getItem(`budgetData_${currentUser.email}`)
      );
      if (savedData) {
        setData(savedData);
      }
    }
  }, []);

  // 🔹 Save data whenever it changes
  useEffect(() => {
    if (currentUser && Object.keys(data).length > 0) {
      localStorage.setItem(
        `budgetData_${currentUser.email}`,
        JSON.stringify(data)
      );
    }
  }, [data]);
  // 🔹 Logout without deleting data
  const handleLogout = () => {
    localStorage.removeItem("currentUser"); // only clears session
    window.location.href = "/Monthly-Budget-Planner/#/";
  };

 const handleAddExpense = () => {
  if (!selectedMonth || !expenseName || !expenseAmount) return;
  if (Number(expenseAmount) <= 0) {
    alert("Amount must be greater than 0");
    return;
  }

  const monthData = data[selectedMonth] || { budget: 0, expenses: [] };

  if (editingId) {
    // Update existing expense
    const updatedExpenses = monthData.expenses.map((exp) =>
      exp.id === editingId ? { ...exp, name: expenseName, amount: Number(expenseAmount) } : exp
    );
    setData({ ...data, [selectedMonth]: { ...monthData, expenses: updatedExpenses } });
    setEditingId(null);
  } else {

    // Add new expense
    const newExpense = { id: Date.now(), name: expenseName, amount: Number(expenseAmount) };

    const monthData = data[selectedMonth] || { budget: 0, expenses: [] };
    const updatedExpenses = [...monthData.expenses, newExpense];
    const totalSpent = updatedExpenses.reduce((acc, item) => acc + item.amount, 0);

  // 🚨 Check if total exceeds budget
  if (monthData.budget > 0 && totalSpent > monthData.budget) {
    alert("Warning: Expenses exceed the monthly budget!");
  }   




    setData({ ...data, [selectedMonth]: { ...monthData, expenses: [...monthData.expenses, newExpense] } });
  }


  setExpenseName("");
  setExpenseAmount("");
};



  const handleDelete = (id) => {
    const monthData = data[selectedMonth];
    const updatedExpenses = monthData.expenses.filter((exp) => exp.id !== id);

    setData({
      ...data,
      [selectedMonth]: { ...monthData, expenses: updatedExpenses },
    });
  };

  const handleEdit = (expense) => {
  setExpenseName(expense.name);
  setExpenseAmount(expense.amount);
  // Optionally track which expense is being edited
  setEditingId(expense.id);
};


  const handleBudgetChange = (value) => {
    if (!selectedMonth) return;

    const monthData = data[selectedMonth] || { budget: 0, expenses: [] };

    setData({
      ...data,
      [selectedMonth]: { ...monthData, budget: Number(value) },
    });

    setBudget(value);
  };

  const monthData = data[selectedMonth] || { budget: 0, expenses: [] };
  const totalSpent = monthData.expenses.reduce((acc, item) => acc + item.amount, 0);
  const remaining = monthData.budget - totalSpent;


  

  return (
     <div className="min-h-screen flex flex-col">
      
      {/* Background Video */}
      <video autoPlay loop muted playsInline className="fixed top-0 left-0 w-full h-full object-cover -z-10">
        <source src={bg1Video} type="video/mp4" />
      </video>

      {/* Overlay for readability */}
      {/* <div className="absolute top-0 left-0 w-full h-full bg-black/40 -z-0"></div> */}
    {/* <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-200 to-pink-200"> */}
      {/* <div className="absolute inset-0 bg-black/30"></div> */}

      {/* NAVBAR WITH ICON */}
<nav className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-md px-6 py-4 mt-1 flex items-center gap-3 text-white rounded-4xl
       shadow-xl flex justify-between ">
            <div className="flex items-center gap-3">
      <WalletIcon className="w-10 h-10" />
      <h1 className="text-2xl font-bold">Budget Planner</h1>
    </div>

    <div className="flex items-center gap-4">
    <span className="font-semibold">
      Welcome, {currentUser?.name || "User"}
    </span>
    <button
      onClick={handleLogout}
      className="bg-red-600 px-3 py-1 rounded-4xl hover:bg-red-700 transition"
    >
      Logout
    </button>
    </div>
  </nav>
     
      {/* <div className="p-6 flex justify-center">
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8 border border-gray-200"> */}
        {/* Main Content */}
      <div className="relative z-10 p-6 flex justify-center">
        <div className="w-full max-w-3xl bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-8 border border-gray-200 opacity-85">

          {/* Month Selector */}
          <div className="mb-6">
            <label className="block font-semibold mb-2 text-gray-700">Select Month</label>
            <input
              type="month"
              className="w-full border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
              value={selectedMonth}
              onChange={(e) => {
                setSelectedMonth(e.target.value);
                setBudget(data[e.target.value]?.budget || "");
              }}
            />
          </div>

          {/* Budget Input */}
          {selectedMonth && (
            <div className="mb-8">
              <label className="block font-semibold mb-2 text-gray-700">Set Monthly Budget</label>
              <input
  type="number"
  min="1"
  className="w-full border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
  placeholder="Enter budget amount"
  value={budget}
  onChange={(e) => {
    if (Number(e.target.value) <= 0) {
      alert("Budget must be greater than 0");
      return;
    }
    handleBudgetChange(e.target.value);
  }}
/>

            </div>
          )}

          {/* Summary Cards */}
          
          {selectedMonth && (
            <div className="grid grid-cols-3 grid-cols-1 md:grid-cols-3  gap-4 mb-8 ">
              {/* <div className="bg-blue-50 p-5 rounded-xl shadow-sm border border-blue-200 text-center">
                <h2 className="font-bold text-blue-700">Total Budget</h2>
                <p className="text-2xl font-semibold">{monthData.budget} AED</p>
              </div> */}
              {/* <div className="bg-blue-50 p-5 rounded-xl shadow-sm border border-blue-200 text-center"> */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm border hover:shadow-lg transition text-center">
                <WalletIcon className="w-8 h-8 mx-auto text-blue-600 mb-2" />
                <h2 className="font-bold text-blue-700">Total Budget</h2>
                <p className="text-2xl font-semibold">{monthData.budget} AED</p>
              </div>

              {/* <div className="bg-red-50 p-5 rounded-xl shadow-sm border border-red-200 text-center">
                <h2 className="font-bold text-red-700">Spent</h2>
                <p className="text-2xl font-semibold">{totalSpent} AED</p>
              </div> */}
              {/* <div className="bg-red-50 p-5 rounded-xl shadow-sm border border-red-200 text-center"> */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-sm border hover:shadow-lg transition text-center">
                <BanknotesIcon className="w-8 h-8 mx-auto text-red-600 mb-2" />
                <h2 className="font-bold text-red-700">Spent</h2>
                <p className="text-2xl font-semibold">{totalSpent} AED</p>
              </div>

              {/* <div className="bg-green-50 p-5 rounded-xl shadow-sm border border-green-200 text-center">
                <h2 className="font-bold text-green-700">Remaining</h2>
                <p className="text-2xl font-semibold">{remaining} AED</p>
              </div> */}

              {/* <div className="bg-green-50 p-5 rounded-xl shadow-sm border border-green-200 text-center"> */}
              <div
  className={`bg-gray-50 p-4 rounded-lg shadow-sm border hover:shadow-lg transition text-center ${
    remaining < 0 ? "bg-red-100 border-red-300" : ""
  }`}
>
  <ChartBarIcon className={`w-8 h-8 mx-auto mb-2 ${remaining < 0 ? "text-red-600" : "text-green-600"}`} />
  <h2 className={`font-bold ${remaining < 0 ? "text-red-700" : "text-green-700"}`}>
    Remaining
  </h2>
  <p className="text-2xl font-semibold">{remaining} AED</p>
</div>


            </div>
          )}
          

          {/* Add Expense */}
          {selectedMonth && (
            <div className="flex gap-3 mb-8">
              <input
                type="text"
                className="flex-1 border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
                placeholder="Expense name"
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
              />

              <input
                type="number"
                 min="1"
                className="w-32 border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
                placeholder="Amount"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
              />

             <button
  onClick={handleAddExpense} className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow-md"
>{editingId ? "Update" : "Add"} </button>

            </div>
          )}

          {/* Expense List */}
          {selectedMonth && (
            <>
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Expenses</h2>

              <div className="space-y-4">
                {monthData.expenses.map((exp) => (
                  <div
                    key={exp.id}
                    className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm border hover:shadow-md transition"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{exp.name}</p>
                      <p className="text-gray-600">{exp.amount} AED</p>
                    </div>
                    <div className="flex gap-2">
                    <button onClick={() => handleEdit(exp)} 
                    className="text-blue-600 hover:text-blue-800">
                    <PencilIcon className="w-6 h-6" /></button>

                    <button onClick={() => handleDelete(exp.id)}
                      className="text-red-600 hover:text-red-800 ml-3">
                      <TrashIcon className="w-6 h-6" /></button>
                    </div>
                  </div>
                ))}

                {monthData.expenses.length === 0 && (
                  <p className="text-gray-500 text-center">No expenses added for this month</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>

  )
}

export default BudgetPlanner