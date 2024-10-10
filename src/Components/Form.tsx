import { FieldValues, useForm } from "react-hook-form";
import { auth, db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const user = auth.currentUser

      if (user) {
        const transaction = {
          amount: parseFloat(data.amount),
          date: data.date,
          category: data.category,
          description: data.description,
          uid: user.uid, // Ensure uid is valid
        };

        // Save the transaction to Firestore
        await addDoc(collection(db, "transactions"), transaction);
        console.log("Transaction added successfully!");
        reset(); // Reset the form
      } else {
        console.error("User is not authenticated or UID is missing.");
      }
    } catch (error) {
      console.error("Error adding transaction: ", error);
    }
  };

  return (
    <div className="mt-8 mx-6 text-white">
      <h2 className="text-3xl font-bold mb-4 text-white">Add New Transaction</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-4 grid-cols-2 gap-4"
      >
        <div>
          <label htmlFor="date" className="block mb-2">Date</label>
          <input
            {...register("date", {
              required: "Please enter a date",
            })}
            type="date"
            id="date"
            className="bg-secondary rounded px-4 py-2 w-full"
          />
          {errors.date && (
            <span className="text-expense">{`${errors.date.message}`}</span>
          )}
        </div>

        <div>
          <label htmlFor="category" className="block mb-2">Category</label>
          <select
            {...register("category", { required: "Please enter a category" })}
            id="category"
            className="bg-secondary rounded px-4 py-2 w-full"
          >
            <option value="">Select a category</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {errors.category && (
            <span className="text-expense">{`${errors.category.message}`}</span>
          )}
        </div>

        <div>
          <label htmlFor="amount" className="block mb-2">Amount</label>
          <input
            {...register("amount", {
              required: "Please enter an amount",
              min: {
                value: 0.01,
                message: "Amount must be a positive number",
              },
            })}
            type="number"
            id="amount"
            className="bg-secondary rounded px-4 py-2 w-full"
          />
          {errors.amount && (
            <span className="text-expense">{`${errors.amount.message}`}</span>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block mb-2">Description</label>
          <input
            {...register("description", {
              required: "Please enter a description",
            })}
            type="text"
            id="description"
            className="bg-secondary rounded px-4 py-2 w-full"
          />
          {errors.description && (
            <span className="text-expense">{`${errors.description.message}`}</span>
          )}
        </div>

        <div className="col-span-2 md:col-span-4 text-right">
          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-text-light hover:scale-110 transition-transform text-white font-bold py-2 px-4 rounded"
          >
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
