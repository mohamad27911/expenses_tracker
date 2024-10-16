import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase.ts";
import { FieldValues, useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";

interface TransactionData extends FieldValues {
  amount: number;
  date: string;
  category: string;
  description: string;
}

interface FormProps {
  onTransactionAdded: () => void;
}

function Form({ onTransactionAdded }: FormProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user || null);
    });
    return () => unsubscribe();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TransactionData>();

  const onSubmit = async (data: TransactionData) => {
    if (currentUser && currentUser.uid) {
      const transaction = {
        amount: parseFloat(data.amount.toString()),
        date: data.date,
        category: data.category,
        description: data.description,
        uid: currentUser.uid,
      };

      try {
        await addDoc(collection(db, "transactions"), transaction);
        console.log("Transaction added successfully!");
        reset();
        onTransactionAdded();
      } catch (error) {
        console.error("Error adding transaction: ", error);
      }
    } else {
      console.error("User is not authenticated.");
    }
  };

  return (
    <div className="mt-8 mx-6 text-white">
      <h2 className="text-3xl font-bold mb-4 text-white">Add New Transaction</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
          {/* Date input */}
          <div>
            <label htmlFor="date" className="block mb-2">Date</label>
            <input
              {...register("date", { required: "Please enter a date" })}
              type="date"
              id="date"
              className="bg-secondary rounded px-4 py-2 w-full"
            />
            {errors.date && <span className="text-expense">{errors.date.message}</span>}
          </div>

          {/* Category input */}
          <div>
            <label htmlFor="category" className="block mb-2">Category</label>
            <select
              {...register("category", { required: "Please select a category" })}
              id="category"
              className="bg-secondary rounded px-4 py-2 w-full"
            >
              <option value="">Select a category</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            {errors.category && <span className="text-expense">{errors.category.message}</span>}
          </div>

          {/* Amount input */}
          <div>
            <label htmlFor="amount" className="block mb-2">Amount</label>
            <input
              {...register("amount", {
                required: "Please enter an amount",
                min: { value: 0.01, message: "Amount must be a positive number" },
              })}
              type="number"
              id="amount"
              className="bg-secondary rounded px-4 py-2 w-full"
            />
            {errors.amount && <span className="text-expense">{errors.amount.message}</span>}
          </div>

          {/* Description input */}
          <div>
            <label htmlFor="description" className="block mb-2">Description</label>
            <input
              {...register("description", { required: "Please enter a description" })}
              type="text"
              id="description"
              className="bg-secondary rounded px-4 py-2 w-full"
            />
            {errors.description && <span className="text-expense">{errors.description.message}</span>}
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-center md:justify-end mt-4">
          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-text-light hover:scale-110 transition-transform text-white font-bold py-2 px-4 rounded"
          >
            {isSubmitting ? "Submitting..." : "Add Transaction"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;