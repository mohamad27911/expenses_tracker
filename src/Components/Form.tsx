import { FieldValues, useForm } from "react-hook-form";
import { TransactionContext } from "../context/TransactionContext";
import { useContext } from "react";

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const { addTransaction } = useContext(TransactionContext);

  const onSubmit = (data: FieldValues) => {
    const transaction = {
      date: data.date,
      category: data.category,
      amount: parseFloat(data.amount),
      description: data.description,
    };
    addTransaction(transaction);
    reset();
  };
  return (
    <div className="mt-8 mx-6 text-white">
      <h2 className="text-3xl font-bold mb-4 text-white">
        Add New Transaction
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid md:grid-cols-4 grid-cols-2 gap-4"
      >
        <div>
          <label htmlFor="date" className="block mb-2">
            Date
          </label>
          <input
            {...register("date", {
              required: "Please enter a date",
            })}
            type="date"
            id="date"
            name="date"
            className="bg-secondary rounded px-4 py-2 w-full"
          />
          {errors.date && (
            <span className="text-expense">{`${errors.date.message}`}</span>
          )}
        </div>
        <div>
          <label htmlFor="category" className="block mb-2">
            Category
          </label>
          <select
            {...register("category", { required: "Please Enter Category" })}
            id="category"
            name="category"
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
          <label htmlFor="amount" className="block mb-2">
            Amount
          </label>
          <input
            {...register("amount", {
              required: "Please Enter Amount",
              min: {
                value: 0.01,
                message: "Amount must be a positive number",
              },
            })}
            type="number"
            id="amount"
            name="amount"
            className="bg-secondary rounded px-4 py-2 w-full"
          />
          {errors.amount && (
            <span className="text-expense">{`${errors.amount.message}`}</span>
          )}
        </div>
        <div>
          <label htmlFor="description" className="block mb-2">
            Description
          </label>
          <input
            {...register("description", {
              required: "Please Enter A Description",
            })}
            type="text"
            id="description"
            name="description"
            className="bg-secondary rounded px-4 py-2 w-full text-white"
          />
          {errors.description && (
            <span className="text-expense">{`${errors.description.message}`}</span>
          )}
        </div>
        <div className="col-span-2 md:col-span-4 text-right">
          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-text-light hover:scale-110 transition-transform  text-white font-bold py-2 px-4 rounded"
          >
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
