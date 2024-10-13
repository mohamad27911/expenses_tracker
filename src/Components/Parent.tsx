import { useState, useEffect } from "react";
import { auth, db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Form from "./Form"; // Correct import for Form
import Table from "./Table"; // Correct import for Table
import Card from "./Card"; // Import Card component

interface Transaction {
  uid: string;
  date: string;
  category: string; // Should be "income" or "expense"
  amount: number;
  description: string;
}

function Parent() {
  const [transactions, setTrans] = useState<Transaction[]>([]);
  const [totalIncome, setTotalIncome] = useState<number>(0);
  const [totalExpense, setTotalExpense] = useState<number>(0);
  const [balance, setBalance] = useState<number>(0);

  const fetchTransactions = async () => {
    const user = auth.currentUser;
    if (user && user.uid) {
      const transactionCollectionRef = collection(db, "transactions");
      const q = query(transactionCollectionRef, where("uid", "==", user.uid));

      try {
        const querySnapshot = await getDocs(q);
        const transList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Transaction, "id">),
        })) as Transaction[];

        setTrans(transList);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("User is not authenticated");
    }
  };

  // Calculate total income, total expenses, and balance whenever transactions change
  useEffect(() => {
    const income = transactions.reduce((acc, transaction) => 
      transaction.category === "income" ? acc + transaction.amount : acc, 0
    );

    const expenses = transactions.reduce((acc, transaction) => 
      transaction.category === "expense" ? acc + transaction.amount : acc, 0
    );

    const currentBalance = income - expenses;

    setTotalIncome(income);
    setTotalExpense(expenses);
    setBalance(currentBalance);
  }, [transactions]);

  useEffect(() => {
    fetchTransactions(); // Fetch transactions when the component mounts
  }, []);

  return (
    <div>
      {/* Update Cards with new values */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 m-auto">
        <Card isProg={false} title="Total Income" value={totalIncome} />
        <Card isProg={false} title="Total Expenses" value={totalExpense} />
        <Card isProg={false} title="Remaining Balance" value={10000-balance} />
        <Card isProg={true} title="Saving Goal" value={balance} /> {/* Adjust as necessary */}
      </div>
      <Table transactions={transactions} /> {/* Pass transactions as a prop */}
      <Form onTransactionAdded={fetchTransactions} /> {/* Pass fetch function */}
    </div>
  );
}

export default Parent;
