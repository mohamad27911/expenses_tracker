import { useState } from "react";

function Form() {
  const [transactions, setTransactions] = useState([
    {
      date: "2023-04-01",
      category: "income",
      amount: 5000,
      description: "Salary",
    },
  ]);

  const [newTransaction, setNewTransaction] = useState({
    date: "",
    category: "",
    amount: 0,
    description: "",
  });

  const handleInputChange = (e) => {
    setNewTransaction({
      ...newTransaction,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTransaction = () => {
    setTransactions([...transactions, newTransaction]);
    setNewTransaction({
      date: "",
      category: "",
      amount: 0,
      description: "",
    });
  };

  return (
    <div className="mt-8 mx-6 text-white">
      <h2 className="text-3xl font-bold mb-4 text-white">Add New Transaction</h2>
      <form className="grid md:grid-cols-4 grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={newTransaction.date}
            onChange={handleInputChange}
            className="bg-secondary rounded px-4 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={newTransaction.category}
            onChange={handleInputChange}
            className="bg-secondary rounded px-4 py-2 w-full"
          >
            <option value="">Select a category</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div>
          <label htmlFor="amount" className="block mb-2">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={newTransaction.amount}
            onChange={handleInputChange}
            className="bg-secondary rounded px-4 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={newTransaction.description}
            onChange={handleInputChange}
            className="bg-secondary rounded px-4 py-2 w-full text-white"
          />
        </div>
        <div className="col-span-2 md:col-span-4 text-right">
          <button
            type="button"
            onClick={handleAddTransaction}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
          >
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
