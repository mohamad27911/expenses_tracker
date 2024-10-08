import { useState, useEffect } from "react";

interface Transaction {
    date: string;
    category: string;
    amount: number;
    description: string;
  }

export const useTransactionTotals = (transactions:Transaction[]) => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((row) => {
      if (row.category === "income") {
        income += row.amount;
      } else if (row.category === "expense") {
        expense += row.amount;
      }
    });

    setTotalIncome(income);
    setTotalExpense(expense);
    setBalance(500000-(income - expense));
  }, [transactions]);

  return { totalIncome, totalExpense, balance };
};
