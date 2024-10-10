import { useContext, useEffect } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { auth, db } from '../config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

function Table() {
  // context API: consumer
  const { transactions, setTransactions } = useContext(TransactionContext); // Ensure setTransactions is available in the context

  // Retrieve the user from localStorage
  const user = JSON.parse(localStorage.getItem("auth") || '{}');

  useEffect(() => {
    const getTransactions = async () => {
      // Check if user is authenticated
      if (user.isAuth) {
        // Create a query to get transactions for the current user
        const transactionCollectionRef = collection(db, "transactions");
        const q = query(transactionCollectionRef, where("uid", "==", user.uid)); // Assuming user.uid is available

        try {
          // Fetch the transactions from Firestore
          const querySnapshot = await getDocs(q);
          const transList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Get the data
          setTransactions(transList); // Update the context or local state
          console.log(transList);
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log("User is not authenticated");
      }
    };

    getTransactions();
  }, [user, setTransactions]); // Dependency on user and setTransactions

  return (
    <div className="relative overflow-x-auto max-h-[50vh] shadow-md sm:rounded-lg mx-6">
      <table className="w-full text-sm text-left rtl:text-right text-blue-100">
        <thead className="text-white uppercase bg-text-light text-center sticky top-0 z-10">
          <tr>
            <th scope="col" className="px-6 py-3">Date</th>
            <th scope="col" className="px-6 py-3 bg-opacity-90">Category</th>
            <th scope="col" className="px-6 py-3">Amount</th>
            <th scope="col" className="px-6 py-3">Description</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {transactions.map((row, index) => (
            <tr key={index} className="bg-secondary">
              <th scope="row" className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap">
                {row.date}
              </th>
              <td className="px-6 py-4">{row.category}</td>
              <td className={`px-6 py-4 ${row.category === "expense" ? "text-expense" : "text-income"}`}>
                {row.category === "expense" ? "-" : "+"}
                <span>${row.amount}</span>
              </td>
              <td className="px-6 py-4">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
