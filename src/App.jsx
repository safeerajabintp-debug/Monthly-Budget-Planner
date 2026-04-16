import { useState } from "react";


export default function App() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [budget, setBudget] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [data, setData] = useState({});

  const handleAddExpense = () => {
    if (!selectedMonth || !expenseName || !expenseAmount) return;

    const newExpense = {
      id: Date.now(),
      name: expenseName,
      amount: Number(expenseAmount),
    };

    const monthData = data[selectedMonth] || { budget: 0, expenses: [] };

    setData({
      ...data,
      [selectedMonth]: {
        ...monthData,
        expenses: [...monthData.expenses, newExpense],
      },
    });

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
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">

      {/* NAVBAR WITH ICON */}
      <nav className="bg-white shadow-md px-6 py-4 flex items-center gap-3">
        {/* <BanknotesIcon className="w-10 h-10 text-blue-600" /> */}
        <h1 className="text-2xl font-bold text-gray-800">Budget Planner</h1>
      </nav>

      <div className="p-6 flex justify-center">
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-xl p-8 border border-gray-200">

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
                className="w-full border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
                placeholder="Enter budget amount"
                value={budget}
                onChange={(e) => handleBudgetChange(e.target.value)}
              />
            </div>
          )}

          {/* Summary Cards */}
          {selectedMonth && (
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-blue-50 p-5 rounded-xl shadow-sm border border-blue-200 text-center">
                <h2 className="font-bold text-blue-700">Total Budget</h2>
                <p className="text-2xl font-semibold">{monthData.budget} AED</p>
              </div>

              <div className="bg-red-50 p-5 rounded-xl shadow-sm border border-red-200 text-center">
                <h2 className="font-bold text-red-700">Spent</h2>
                <p className="text-2xl font-semibold">{totalSpent} AED</p>
              </div>

              <div className="bg-green-50 p-5 rounded-xl shadow-sm border border-green-200 text-center">
                <h2 className="font-bold text-green-700">Remaining</h2>
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
                className="w-32 border rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400"
                placeholder="Amount"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
              />

              <button
                onClick={handleAddExpense}
                className="bg-blue-600 text-white px-5 rounded-lg hover:bg-blue-700 shadow-md"
              >
                Add
              </button>
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

                    <button
                      onClick={() => handleDelete(exp.id)}
                      className="text-red-600 font-bold text-xl hover:text-red-800"
                    >
                      ✖
                    </button>
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
  );
}
