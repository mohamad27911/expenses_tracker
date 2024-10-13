import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useState, useEffect } from "react";

interface Transaction {
  uid: string;
  date: string;
  category: string;
  amount: number;
  description: string;
}

const useTransactions = () => {
  const [trans, setTrans] = useState<Transaction[]>([]);

  const getTransactions = async () => {
    const user = auth.currentUser
    if (user && user.uid) {
      const transactionCollectionRef = collection(db, "transactions");
      const q = query(transactionCollectionRef, where("uid", "==", user.uid));

      try {
        const querySnapshot = await getDocs(q);
        const transList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Transaction, 'id'>), // Cast Firestore data to Transaction type
        })) as Transaction[]; // Type assertion to Transaction[]
        setTrans(transList);
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("User is not authenticated");
    }
  };

  useEffect(() => {
    getTransactions(); // Automatically fetch transactions when the component mounts
  }, []);

  return trans; // Return the transactions array for use in the component
};

export default useTransactions;
